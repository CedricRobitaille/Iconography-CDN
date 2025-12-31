using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;


namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]

  public class MyIconsController : ControllerBase
  {


    private readonly MyDbContext _context;
    public MyIconsController(MyDbContext context)
    {
      _context = context;
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
      
      return Ok(icons);
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

      return Ok(icon);
    }


  }
}