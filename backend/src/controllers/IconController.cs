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


    // Post Handling for '/api/icon' (New Icon)
    [HttpPost("{companyId}")]
    public async Task<ActionResult<Icon>> Create(int companyId, [FromBody] IconCreationDto dto)
    {
      // Data comes in as follows:
      // {
      //   "Icon": {
      //     "Name": string,
      //     "Svg": string
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
        Name = dto.Icon.Name,
        Svg = dto.Icon.Svg,
      };

      _context.Icons.Add(icon);
      await _context.SaveChangesAsync();

      // Create a new Company_Icon
      var owner = new Company_Icon
      {
        IconId = icon.Id,
        CompanyId = companyId,
        UserId = dto.User.Id,
      };

      _context.Company_Icons.Add(owner);
      await _context.SaveChangesAsync();


      return Ok(new //HTTP 200 Status Code)
      {
        Message = "Icon successfully created",
        IconId = icon.Id,
      });
    }


    // Get all icons
    [HttpGet] 
    public async Task<ActionResult<IEnumerable<Icon>>> GetAll()
      => await _context.Icons.ToListAsync();


    // Get company's icons
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
  }
}