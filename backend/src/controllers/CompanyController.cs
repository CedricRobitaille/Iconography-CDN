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
      if (company == null) return NotFound($"Company {id} does not exist");
      return Ok(company);
    }


    //  PUT '/api/company/id'
    [HttpPut("{id}")]
    public async Task<ActionResult<Company>> Patch(int id, [FromBody] CompanyPutDto dto)
    {
      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {
        var company = await _context.Companies.FindAsync(id);
        if (company == null) return NotFound();

        company.Name = dto.Name;
        company.OwnerId = dto.OwnerId;
        company.Type = (Company.CompanyTypes)dto.Type;

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return Ok(new
        {
          message = "Company Edited Successfully.",
          Company = company
        });
      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
    }


    // PATCH '/api/company/id'
    [HttpPatch("{id}")]
    public async Task<ActionResult<Company>> Put(int id, [FromBody] CompanyPatchDto dto)
    {
      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {
        var company = await _context.Companies.FindAsync(id);
        if (company == null)
        {
          await transaction.RollbackAsync();
          return NotFound();
        } 

        // Only update fields that are provided
        if (!string.IsNullOrWhiteSpace(dto.Name))
          company.Name = dto.Name;

        if (dto.OwnerId.HasValue)
          company.OwnerId = dto.OwnerId;

        if (dto.Type.HasValue)
          company.Type = (Company.CompanyTypes)dto.Type;

        // Mark the entity as modified
        _context.Companies.Update(company);
        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return Ok(new {
          message = "Company Edited Successfully.",
          Company = company
        });
      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
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