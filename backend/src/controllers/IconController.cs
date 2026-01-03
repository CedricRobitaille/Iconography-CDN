using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;


namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]

  public class IconController : ControllerBase
  {
    private readonly MyDbContext _context;
    public IconController(MyDbContext context)
    {
      _context = context;
    }


    // ============================
    // Post Handling for '/api/icon' (New Icon)
    // ============================
    [HttpPost]
    public async Task<ActionResult<Icon>> Create(int companyId, [FromBody] IconCreationDto dto)
    {
      // Data comes in as follows:
      // {
      //   "Icon": {
      //     "Name": string,
      //     "Svg": string,
      //     "Style": string,
      //     "Type": string,
      //     "Category": string,
      //     "Tags": array[]
      //   },
      //   "User": {
      //     "Id": int
      //   }
      //   "Company": {
      //     "Id": 3
      //   }
      // }

      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {

        // Ensure Company Exists
        var company = await _context.Companies.FindAsync(dto.Company.Id);
        if (company == null)
        {
          await transaction.RollbackAsync();
          return NotFound($"Company {companyId} does not exist.");
        }
          

        var author = await _context.Users.FindAsync(dto.User.Id);
        if (author == null)
        {
          await transaction.RollbackAsync();
          return NotFound($"User {dto.User.Id} does not exist.");
        }
          

        // Create a new Icon
        var icon = new Icon
        {
          Name = dto.Icon.Name,         // Name
          Svg = dto.Icon.Svg,           // SVG
          Style = dto.Icon.Style,       // Style
          Type = dto.Icon.Type,         // Type
          Category = dto.Icon.Category  // Category
        };

        // Set the new icon into context
        _context.Icons.Add(icon);
        await _context.SaveChangesAsync();


        // Create a new Company_Icon
        var owner = new Company_Icon
        {
          IconId = icon.Id,       // Icon ID
          CompanyId = company.Id,  // Company Id
          UserId = author.Id,   // Author's User Id
        };

        // Set the Icon/Company relationship into context
        _context.Company_Icons.Add(owner);
        await _context.SaveChangesAsync();

        // Build list of tags (typed and custom)
        // We need to do this since we need to track tags/theme counts in the tags table.
        // This specific structure is needed since data comes in as follows:
        // "Icon": {
        //   "Name": "Mouse",
        //   "Svg": "Mouse Illustration",
        //   "Style": "Regular",    --- MUST TRACK QTY ---
        //   "Type": "Line",        --- MUST TRACK QTY ---
        //   "Category": "Animals", --- MUST TRACK QTY ---
        //   "Tags": [              --- MUST TRACK QTY ---
        //       "Mouse",
        //       "Rat",
        //       "Rodent",
        //       "Cute"
        //   ]
        // }
        // Since the tags are structured differently than the cat/type/style,
        // we need to define typed tags as done below.

        var typedTags = new List<(string Name, string Type)> {
          (dto.Icon.Style, "Style"),
          (dto.Icon.Type, "Type"),
          (dto.Icon.Category, "Category")
        };

        // Add custom taged tags from the tags with the custom tags
        typedTags.AddRange(dto.Icon.Tags.Select(t => (t, "Custom")));

        // Create every tag
        foreach (var (tagName, tagType) in typedTags)
        {
          // Skip null or empty tags
          if (string.IsNullOrWhiteSpace(tagName)) continue;

          // Check if the Tag already exists
          var tag = await _context.Tags
            .FirstOrDefaultAsync(t => t.Name == tagName && t.Type == tagType);

          if (tag == null) // Create a new tag ONLY if it doesn't already exist
          {
            tag = new Tag // Create the tag
            {
              Name = tagName,
              Type = tagType, // Set to type defined in typedTags above.
              IconCount = 0
            };
            _context.Tags.Add(tag); // Add the Tag into context
            await _context.SaveChangesAsync(); // Save the tag into the DB
          }

          // Increment iconCount
          tag.IconCount++;

          // Create the Icon/Tag Relationship
          var iconTag = new Icon_Tag
          {
            IconId = icon.Id, // Icon ID
            TagId = tag.Id    // Tag ID
          };

          _context.Icon_Tags.Add(iconTag);  // Add the tag into context
        }
        await _context.SaveChangesAsync();  // Save all Tag contexts into the DB
        await transaction.CommitAsync();

        // Finally, we map it to a responseIcon so that we can see the tags combined.
        var responseIcon = await _context.Icons
          .Where(i => i.Id == icon.Id)
          .Select(IconProjections.ToIconDisplayDto())
          .FirstAsync();

        return CreatedAtAction(
          nameof(GetById),
          new { id = icon.Id },
          new { Icon = responseIcon }
        );
      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
    }


    // ============================
    // Get all icons
    // ============================
    [HttpGet] 
    public async Task<ActionResult<IEnumerable<Icon>>> GetAll(
      // Icon DTO
      [FromQuery] string? name,
      [FromQuery] string? style,
      [FromQuery] string? type,
      [FromQuery] string? category,
      [FromQuery] string? tags
    )
    {
      IQueryable<Icon> query = _context.Icons
        .Include(i => i.Icon_Tags)
            .ThenInclude(it => it.Tag);

      // /icon?name=string
      if (!string.IsNullOrWhiteSpace(name))
      {
        query = query.Where(i =>
            EF.Functions.Like(i.Name, $"%{name}%"));
      }

      // /icon?style=string
      if (!string.IsNullOrWhiteSpace(style))
      {
        query = query.Where(i =>
            EF.Functions.Like(i.Style, $"%{style}%"));
      }

      // /icon?type=string
      if (!string.IsNullOrWhiteSpace(type))
      {
        query = query.Where(i =>
            EF.Functions.Like(i.Type, $"%{type}%"));
      }

      // /icon?category=string
      if (!string.IsNullOrWhiteSpace(category))
      {
        query = query.Where(i =>
            EF.Functions.Like(i.Category, $"%{category}%"));
      }

      // /icon?tags=string,string,string
      if (!string.IsNullOrWhiteSpace(tags))
      {
        var tagList = tags
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(t => t.Trim())
            .ToList();

        query = query.Where(i =>
            i.Icon_Tags.Any(it =>
                tagList.Contains(it.Tag.Name)));
      }

      var results = await query
          .Select(IconProjections.ToIconDisplayDto()) // Projection to Add the Tags
          .ToListAsync();

      if (results.Count == 0)
        return NotFound("No icons could be found.");

      return Ok(results);
    }


    // ============================
    // Get Icon By Id
    // ============================
    [HttpGet("{id}")]
    public async Task<ActionResult<IconReadDto>> GetById(int id)
    {
      var icon = await _context.Icons
        .Where(i => i.Id == id)
        .Select(IconProjections.ToIconDisplayDto())
        .FirstOrDefaultAsync();

      if (icon == null) 
        return NotFound($"Icon {id} does not exist");

      return Ok(icon);
    }



    [HttpPut("{id}")]
    public async Task<ActionResult<Icon>> Put(int id, [FromBody] IconPutDto dto)
    {
      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {
        var icon = await _context.Icons
        .Include(i => i.Icon_Tags)
        .ThenInclude(it => it.Tag)
        .FirstOrDefaultAsync(i => i.Id == id);

        if (icon == null)
        {
          await transaction.RollbackAsync();
          return NotFound($"Icon {id} does not exist");
        }

        // Set icon props
        icon.Name = dto.Name;
        icon.Svg = dto.Svg;
        icon.Style = dto.Style;
        icon.Type = dto.Type;
        icon.Category = dto.Category;

        // Build list of tags (typed and custom)
        var incomingTags = new List<(string Name, string Type)>
        {
            (dto.Style, "Style"),
            (dto.Type, "Type"),
            (dto.Category, "Category")
        };

        incomingTags.AddRange(dto.Tags.Distinct().Select(t => (t, "Custom")));

        // Get all existing tags
        var existingTags = icon.Icon_Tags
          .Select(it => (it.Tag.Name, it.Tag.Type))
          .ToList();


        // Remove tags that are no longer present
        var toRemove = icon.Icon_Tags
          .Where(it => !incomingTags.Contains((it.Tag.Name, it.Tag.Type)))
          .ToList();

        foreach (var iconTag in toRemove)
        {
          iconTag.Tag.IconCount = Math.Max(0, iconTag.Tag.IconCount - 1);
          _context.Icon_Tags.Remove(iconTag);
        }

        // Add new tags
        foreach (var (tagName, tagType) in incomingTags)
        {
          // Skip if the icon already has this tag
          if (existingTags.Contains((tagName, tagType))) continue;

          // Check if tag exists in Tags table
          var tag = await _context.Tags
            .FirstOrDefaultAsync(t => t.Name == tagName && t.Type == tagType);

          if (tag == null)
          {
            tag = new Tag
            {
              Name = tagName,
              Type = tagType,
              IconCount = 0
            };
            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();
          }

          tag.IconCount++;

          // Create Icon_Tag relationship
          var iconTag = new Icon_Tag
          {
            IconId = icon.Id,
            TagId = tag.Id
          };
          _context.Icon_Tags.Add(iconTag);
        }

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return Ok(new
        {
          message = "Icon Edited successfully.",
          Icon = icon
        });
      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
    }


    [HttpPatch("{id}")]
    public async Task<ActionResult<Icon>> Patch(int id, [FromBody] IconPatchDto dto)
    {
      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {
        var icon = await _context.Icons
            .Include(i => i.Icon_Tags)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (icon == null)
        {
          await transaction.RollbackAsync();
          return NotFound($"Icon {id} does not exist");
        }
          

        // Update props ONLY when provided
        if (dto.Name != null) icon.Name = dto.Name;
        if (dto.Svg != null) icon.Svg = dto.Svg;
        if (dto.Style != null) icon.Style = dto.Style;
        if (dto.Type != null) icon.Type = dto.Type;
        if (dto.Category != null) icon.Category = dto.Category;

        // Update typed tags + custom tags if the user included them.
        if (dto.Tags != null || dto.Style != null || dto.Type != null || dto.Category != null)
        {
          // Build full list of incoming tags
          var incomingTags = new List<(string Name, string Type)>();

          if (dto.Style != null) 
            incomingTags.Add((dto.Style, "Style"));
          else incomingTags.Add((icon.Style, "Style")); // keep current style

          if (dto.Type != null) incomingTags.Add((dto.Type, "Type"));
          else incomingTags.Add((icon.Type, "Type")); // keep current type

          if (dto.Category != null) incomingTags.Add((dto.Category, "Category"));
          else incomingTags.Add((icon.Category, "Category")); // keey current category

          if (dto.Tags != null)
            incomingTags.AddRange(dto.Tags.Distinct().Select(t => (t, "Custom")));

          // Get existing tags (Name + Type)
          var existingTags = icon.Icon_Tags
              .Select(it => (it.Tag.Name, it.Tag.Type))
              .ToList();

          // Remove non-persisting tags
          var toRemove = icon.Icon_Tags
              .Where(it => !incomingTags.Contains((it.Tag.Name, it.Tag.Type)))
              .ToList();

          foreach (var iconTag in toRemove)
          {
            iconTag.Tag.IconCount = Math.Max(0, iconTag.Tag.IconCount - 1);
            _context.Icon_Tags.Remove(iconTag);
          }

          // Create new tags
          foreach (var (tagName, tagType) in incomingTags)
          {
            if (existingTags.Contains((tagName, tagType))) continue; // already contains

            var tag = await _context.Tags
                .FirstOrDefaultAsync(t => t.Name == tagName && t.Type == tagType);

            if (tag == null)
            {
              tag = new Tag // Create a new tag
              {
                Name = tagName,
                Type = tagType,
                IconCount = 0
              };
              _context.Tags.Add(tag);
              await _context.SaveChangesAsync();
            }

            // increment icon count
            tag.IconCount++;

            _context.Icon_Tags.Add(new Icon_Tag
            {
              IconId = icon.Id,
              TagId = tag.Id
            });
          }
        }

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return Ok(new
        {
          message = "Icon created successfully.",
          Icon = icon
        });
      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
    }



    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {
        var icon = await _context.Icons
            .Include(i => i.Icon_Tags)
            .ThenInclude(it => it.Tag)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (icon == null) return NotFound($"Icon {id} does not exist");

        // Decrement IconCount for all associated tags
        foreach (var iconTag in icon.Icon_Tags)
        {
          iconTag.Tag.IconCount = Math.Max(0, iconTag.Tag.IconCount - 1);
        }

        // Remove icon-tag relationships
        _context.Icon_Tags.RemoveRange(icon.Icon_Tags);

        // Remove the icon
        _context.Icons.Remove(icon);

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return NoContent();
      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
    }
  }
}