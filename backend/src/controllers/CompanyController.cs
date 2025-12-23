using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")] // The [controller] is a placeholder for the controller class below
                              // To derive the endpoint, we use the code below...
  public class CompanyController : ControllerBase // Controller Base takes 'UserController' and removes the suffix "Contoller" leaving it as 'User'.
  {                                            // That is how we are left with the API endpoint of '/api/company'
    private readonly MyDbContext _context;

    public CompanyController(MyDbContext context)
    {
      _context = context;
    }

    //  GET '/api/company'
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Company>>> GetAll()
      => await _context.Companies.ToListAsync();



    //  GET '/api/company/id'
    [HttpGet("{id}")]
    public async Task<ActionResult<Company>> GetById(int id)
    {
      var company = await _context.Companies.FindAsync(id);
      if (company == null) return NotFound();
      return company;
    }


    //  DELETE '/api/company/id'
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var company = await _context.Companies.FindAsync(id);
      if (company == null) return NotFound();
      _context.Companies.Remove(company);
      await _context.SaveChangesAsync();
      return NoContent();
    }
  }
}