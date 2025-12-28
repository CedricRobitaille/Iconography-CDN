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
    [HttpPost("{companyId}")]
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
      //   "Author": {
      //     "Id": int
      //   }
      // }

      // Ensure Company Exists
      var companyExists = await _context.Companies.AnyAsync(c => c.Id == companyId);
      if (!companyExists)
        return NotFound($"Company {companyId} does not exist.");

      var authorExists = await _context.Users.AnyAsync(u => u.Id == dto.User.Id);
      if (!authorExists)
        return NotFound($"User {dto.User.Id} does not exist.");

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
        CompanyId = companyId,  // Company Id
        UserId = dto.User.Id,   // Author's User Id
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


      return Ok(new //HTTP 200 Status Code)
      {
        Message = "Icon successfully created",
        IconId = icon.Id,
      });
    }


    // ============================
    // Get all icons
    // ============================
    [HttpGet] 
    public async Task<ActionResult<IEnumerable<Icon>>> GetAll(
      [FromQuery] string? name,
      [FromQuery] string? style,
      [FromQuery] string? type,
      [FromQuery] string? category,
      [FromQuery] string? tags
    )
    {
      IQueryable<Icon> query = _context.Icons;

      // Query for /icon?name=string
      if (!string.IsNullOrEmpty(name))
        query = query.Where(i => EF.Functions.Like(i.Name, $"%{name}%"));

      // Query for /icon?style=string
      if (!string.IsNullOrEmpty(style))
        query = query.Where(i => EF.Functions.Like(i.Style, $"%{style}%"));

      // Query for /icon?type=string
      if (!string.IsNullOrEmpty(type))
        query = query.Where(i => EF.Functions.Like(i.Type, $"%{type}%"));

      // Query for /icon?category=string
      if (!string.IsNullOrEmpty(category))
        query = query.Where(i => EF.Functions.Like(i.Category, $"%{category}%"));

      // Query for /icon?tags=string
      if (!string.IsNullOrEmpty(tags))
      {
        // Convert "tags=1,2,3,4" -> [1,2,3,4]
        var tagList = tags.Split(',').Select(t => t.Trim()).ToList();
        // Filter in Tags where Icon_Tags contains a TagName found in the TagList
        query = query.Where(i => i.Icon_Tags.Any(it => tagList.Contains(it.Tag.Name)));
      } 

      var results = await query // Final filter on icons
        .Include(i => i.Icon_Tags)
          .ThenInclude(it => it.Tag)
        .Select(i => new 
        {
          i.Id,
          i.Name,
          i.Style,
          i.Type,
          i.Category,
          i.Svg,
          Tags = i.Icon_Tags.Select(it => new // List out all tags
          {
            it.Tag.Id,  // Tag ID
            it.Tag.Name // Tag Name
          }).ToList() // Convert to list/Array
        })
        .ToListAsync();

      if (!results.Any())
        return NotFound();

      return Ok(results);
    }


    // ============================
    // Get company's icons
    // ============================
    [HttpGet("{companyId}")]
    public async Task<ActionResult<IEnumerable<Icon>>> GetByCompanyId(int companyId)
    {
      // We need to query the `Company_Icons` table to find where companyId match, and return the icon
      var icons = await _context.Company_Icons
        .Where(ci => ci.CompanyId == companyId)
        .Select(ci => ci.Icon)
        .ToListAsync();

      if (icons.Count == 0) return NotFound();
      return icons;
    }


    // ============================
    // Get Icons by companyId AND iconId
    // ============================
    [HttpGet("{companyId}/{iconId}")]
    public async Task<ActionResult<Icon>> GetByIconId(int companyId, int iconId)
    {
      var icon = await _context.Company_Icons
        .Where(ci => ci.CompanyId == companyId)
        .Where(ci => ci.IconId == iconId)
        .Select(ci => ci.Icon)
        .SingleOrDefaultAsync();

        if (icon == null) return NotFound();
        return icon;
    }


  }
}