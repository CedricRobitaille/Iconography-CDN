using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;


namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]

  public class MyCollectionsController : ControllerBase
  {


    private readonly MyDbContext _context;
    public MyCollectionsController(MyDbContext context)
    {
      _context = context;
    }


    // ============================
    // Get company's icons
    // ============================
    [HttpGet("{companyId}")]
    public async Task<ActionResult<IEnumerable<Collection>>> GetByCompanyId(int companyId)
    {
      // We need to query the `Company_Icons` table to find where companyId match, and return the icon
      var collections = await _context.Collections
        .Where(c => c.CompanyId == companyId)
        .ToListAsync();

      if (collections.Count == 0) return NotFound();

      return Ok(collections);
    }
  }
}