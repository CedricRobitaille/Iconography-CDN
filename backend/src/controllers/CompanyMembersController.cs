using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]

  public class Company_MemberController : ControllerBase
  {
    private readonly MyDbContext _context;
    public Company_MemberController(MyDbContext context)
    {
      _context = context;
    }


    // GET './api/company_member'
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Company_Member>>> GetAll(
      [FromQuery] int? companyId,
      [FromQuery] int? userId
    )
    {
      IQueryable<Company_Member> query = _context.Company_Members;

      if (companyId.HasValue)
        query = query.Where(cm => cm.CompanyId == companyId.Value);

      if (userId.HasValue)
        query = query.Where(cm => cm.UserId == userId.Value);

      var results = await query.ToListAsync();

      if (!results.Any())
        return NotFound();

      return Ok(results);
    }



    //  GET '/api/company_member/id'
    [HttpGet("{id}")]
    public async Task<ActionResult<Company_Member>> GetById(int id)
    {
      var company_member = await _context.Company_Members.FindAsync(id);
      if (company_member == null) return NotFound();
      return company_member;
    }

  }

}