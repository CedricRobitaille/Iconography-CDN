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

        // Create every tag
        foreach (string tagName in dto.Icon.Tags)
        {
          // Check if the Tag already exists
          var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Name == tagName);

          if (tag == null) // Create a new tag ONLY if it doesn't already exist
          {
            tag = new Tag { Name = tagName }; // Create the Tag
            _context.Tags.Add(tag); // Add the Tag into context
            await _context.SaveChangesAsync();  // Save the tag into the DB
          }

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

        // Get all existing tags
        var existingTags = icon.Icon_Tags
          .Select(it => it.Tag.Name)
          .ToList();


        // Get Incoming tags (Remove duplicates)
        var incomingTags = dto.Tags.Distinct().ToList();

        // Remove tags that are no longer present
        var toRemove = icon.Icon_Tags
          .Where(it => !incomingTags.Contains(it.Tag.Name))
          .ToList();

        // If incoming doesn't include existing, remove it.
        _context.Icon_Tags.RemoveRange(toRemove);

        // Add new tags
        foreach (var tagName in incomingTags)
        {
          // Skip if the icon already has this tag
          if (existingTags.Contains(tagName)) continue;

          // Check if tag exists in Tags table
          var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Name == tagName);
          if (tag == null)
          {
            tag = new Tag { Name = tagName };
            _context.Tags.Add(tag);
            await _context.SaveChangesAsync(); // Save so tag gets an ID
          }

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

        // Update Tags if the user included them.
        if (dto.Tags != null)
        {
          // Get all existing tags
          var existingTags = icon.Icon_Tags
            .Select(it => it.Tag.Name)
            .ToList();


          // Get Incoming tags (Remove duplicates)
          var incomingTags = dto.Tags.Distinct().ToList();

          // Remove tags that are no longer present
          var toRemove = icon.Icon_Tags
            .Where(it => !incomingTags.Contains(it.Tag.Name))
            .ToList();

          // If incoming doesn't include existing, remove it.
          _context.Icon_Tags.RemoveRange(toRemove);

          // Add new tags
          foreach (var tagName in incomingTags)
          {
            // Skip if the icon already has this tag
            if (existingTags.Contains(tagName)) continue;

            // Check if tag exists in Tags table
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Name == tagName);
            if (tag == null)
            {
              tag = new Tag { Name = tagName };
              _context.Tags.Add(tag);
              await _context.SaveChangesAsync(); // Save so tag gets an ID
            }

            // Create Icon_Tag relationship
            var iconTag = new Icon_Tag
            {
              IconId = icon.Id,
              TagId = tag.Id
            };
            _context.Icon_Tags.Add(iconTag);
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
      var icon = await _context.Icons.FindAsync(id);
      if (icon == null) return NotFound($"Icon {id} does not exist");

      _context.Icons.Remove(icon);
      await _context.SaveChangesAsync();
      return NoContent();
    }
  }
}