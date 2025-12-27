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
    [HttpPost]
    public async Task<ActionResult<Icon>> Create([FromBody] IconCreationDto dto)
    {
      // Data comes in as follows:
      // {
      //   "Icon": {
      //     "Name": string,
      //     "Svg": string
      //   },
      //   "Company": {
      //     "Id": int
      //   },
      //   "Author": {
      //     "Id": int
      //   }
      // }

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
        CompanyId = dto.Company.Id,
        AuthorId = dto.User.Id,
      };

      _context.Company_Icons.Add(owner);
      await _context.SaveChangesAsync();


      return Ok(new //HTTP 200 Status Code)
      {
        Message = "Icon successfully created",
        IconId = icon.Id,
      });
    }



  }
}