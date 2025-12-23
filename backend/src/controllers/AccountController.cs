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
      //     "UserId": int,
      //   }
      // }

      // Distinct Emails Only
      if (await _context.Users.AnyAsync(user => user.Email == dto.User.Email))
      {
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
      };

      _context.Users.Add(user);
      await _context.SaveChangesAsync(); // Insert user into DB, Generate the Id, Insert Id back into user


      // Create a new Company
      var company = new Company
      {
        Name = dto.Company.Name,
        Type = (Company.CompanyTypes)dto.Company.Type,
        UserId = user.Id,
      };

      _context.Companies.Add(company);
      await _context.SaveChangesAsync(); // Insert Company into DB, Generate the Id, Insert Id back into Company


      // Create a initial Company_Member (Assign as Owner)
      var member = new Company_Member
      {
        UserId = user.Id,
        CompanyId = company.Id,
        Type = Company_Member.MemberRoles.Owner,
      };

      _context.Company_Members.Add(member);
      await _context.SaveChangesAsync();



      return Ok(new // HTTP 200 status code
      {
        Message = "Account successfully created",
        UserId = user.Id,
        CompanyId = company.Id
      });
    }






    // Post Handling for '/api/account/join' (New Member)
    [HttpPost("join")]
    public async Task<ActionResult<Company>> Create([FromBody] MemberCreationDto dto) // Bind the request body to the client
    {

      // Data comes in as follows:
      // {
      //   "User": {
      //     "Name": string,
      //     "Email": string,
      //     "Password": string,
      //   }, 
      //   "Company": {
      //     "Id": int,
      //   }
      //   "Member": {
      //     "type": int,
      //   }
      // }

      // Distinct Emails Only
      if (await _context.Users.AnyAsync(user => user.Email == dto.User.Email))
      {
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
      };

      _context.Users.Add(user);
      await _context.SaveChangesAsync(); // Insert user into DB, Generate the Id, Insert Id back into user



      // Add user to company (Assign as Owner)
      var member = new Company_Member
      {
        UserId = user.Id,
        CompanyId = dto.Company.Id,
        Type = (Company_Member.MemberRoles)dto.Company_Member.Type,
      };

      _context.Company_Members.Add(member);
      await _context.SaveChangesAsync();



      return Ok(new // HTTP 200 status code
      {
        Message = "Account successfully created",
        UserId = user.Id,
        CompanyMemberId = member.Id
      });
    }


    // Function to hash passwords with BCrypt
    private string HashPassword(string password)
    {
      // BCrypt password hasher, provided password and salt amnt
      return BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);
    }
  }

}