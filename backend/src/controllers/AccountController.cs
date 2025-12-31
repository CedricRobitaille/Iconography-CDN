using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")] // The [controller] is a placeholder for the controller class below
                              // To derive the endpoint, we use the code below...
  public class AccountController : ControllerBase // Controller Base takes 'AccountController' and removes the suffix "Contoller" leaving it as 'User'.
  {                                               // That is how we are left with the API endpoint of '/api/company'
    private readonly MyDbContext _context;

    public AccountController(MyDbContext context)
    {
      _context = context;
    }




    // Post Handling for '/api/account/register' (New Company)
    [HttpPost("register")]
    public async Task<ActionResult<Company>> Create([FromBody] AccountCreationDto dto) // Bind the request body to the client
    {

      // Data comes in as follows:
      // {
      //   "User": {
      //     "Name": string,
      //     "Email": string,
      //     "Password": string,
      //   }, 
      //   "Company": {
      //     "Name": string,
      //     "Type": int,
      //   }
      // }

      // Initialize the Transaction
      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {

        // Distinct Emails Only
        if (await _context.Users.AnyAsync(user => user.Email == dto.User.Email))
        {
          await transaction.RollbackAsync();
          return BadRequest("Email is already in use.");
        }

        // Hash password
        string passwordHash = HashPassword(dto.User.Password);


        // Create a new User
        var user = new User
        {
          Name = dto.User.Name,
          Email = dto.User.Email,
          Password_Hash = passwordHash,
          Role = Models.User.MemberRoles.Owner, // Assign as Owner by default
          CompanyId = null
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync(); // user.Id generated

        // Create a new Company
        var company = new Company
        {
          Name = dto.Company.Name,
          Type = (Company.CompanyTypes)dto.Company.Type,
          OwnerId = user.Id,
        };

        _context.Companies.Add(company);
        await _context.SaveChangesAsync(); // company.Id generated



        // Update user with companyId

        user.CompanyId = company.Id;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();


        // Once all have changes went through, commit the transaction.
        await transaction.CommitAsync();

        return CreatedAtAction(
          "GetById", 
          "User",
          new { id = user.Id }, 
          new { User = user, Company = company}
        );
      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
    }




    // Post Handling for '/api/account/join' (New Member)
    [HttpPost("join")]
    public async Task<ActionResult<Company>> Join([FromBody] CompanyJoinDto dto) // Bind the request body to the client
    {

      // Data comes in as follows:
      // {
      //   "User": {
      //     "Name": string,
      //     "Email": string,
      //     "Password": string,
      //     "CompanyId": int,
      //     "Role": int,
      //   }
      // }

      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {
        // Find company
        var company = await _context.Companies
          .Include(c => c.Employees)
          .FirstOrDefaultAsync(c => c.Id == dto.User.CompanyId);

        // Confirm company exists
        if (company == null) 
        {
          await transaction.RollbackAsync();
          return NotFound("Company not found");
        }

        // Distinct Emails Only
        if (await _context.Users.AnyAsync(user => user.Email == dto.User.Email))
        {
          await transaction.RollbackAsync();
          return BadRequest("Email is already in use.");
        }

        // Hash password
        string passwordHash = HashPassword(dto.User.Password);

        // Create a new User
        var user = new User
        {
          Name = dto.User.Name,
          Email = dto.User.Email,
          Password_Hash = passwordHash,
          CompanyId = dto.User.CompanyId,
          Role = (User.MemberRoles)dto.User.Role,
        };
  
        company.Employees.Add(user);

        _context.Users.Add(user);
        await _context.SaveChangesAsync(); // Insert user into DB, Generate the Id, Insert Id back into user

        // Once all have changes went through, commit the transaction.
        await transaction.CommitAsync();

        return CreatedAtAction(
          "GetById",
          "User",
          new { id = user.Id },
          new { User = user, CompanyId = company.Id }
        );
      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
    }


    // Function to hash passwords with BCrypt
    private string HashPassword(string password)
    {
      // BCrypt password hasher, provided password and salt amnt
      return BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);
    }
  }

}