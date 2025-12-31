using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")] // The [controller] is a placeholder for the controller class below
                              // To derive the endpoint, we use the code below...
  public class UserController : ControllerBase // Controller Base takes 'UserController' and removes the suffix "Contoller" leaving it as 'User'.
  {                                            // That is how we are left with the API endpoint of '/api/user'
    private readonly MyDbContext _context;

    public UserController(MyDbContext context)
    {
      _context = context;
    }



    //  GET '/api/user'
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAll()
      => await _context.Users.ToListAsync();



    //  GET '/api/user/id'
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetById(int id)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null) return NotFound();
      return user;
    }



    // PUT '/api/user/id'
    [HttpPut("{id}")]
    public async Task<ActionResult<User>> Put(int id, [FromBody] UserPutDto dto)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null) return NotFound();

      user.Name = dto.Name;
      user.Email = dto.Email;
      user.Password_Hash = HashPassword(dto.Password);
      user.Role = (User.MemberRoles)dto.Role;

      await _context.SaveChangesAsync();
      return user;
    }
    


    // PATCH '/api/user/id'
    [HttpPatch("{id}")]
    public async Task<ActionResult<User>> Patch(int id, [FromBody] UserPatchDto dto)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null) return NotFound();

      // Only update fields that are provided
      if (!string.IsNullOrWhiteSpace(dto.Name))
        user.Name = dto.Name;

      if (!string.IsNullOrWhiteSpace(dto.Email))
        user.Email = dto.Email;

      if (!string.IsNullOrWhiteSpace(dto.Password))
        user.Password_Hash = HashPassword(dto.Password);

      if (dto.Role.HasValue)
        user.Role = (User.MemberRoles)dto.Role;

      // Mark the entity as modified
      _context.Users.Update(user);
      await _context.SaveChangesAsync();

      return user;
    }


    //  DELETE '/api/user/id'
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null) return NotFound($"User {id} does not exist");
      _context.Users.Remove(user);
      await _context.SaveChangesAsync();
      return NoContent();
    }


    // Function to hash passwords with BCrypt
    private string HashPassword(string password)
    {
      // BCrypt password hasher, provided password and salt amnt
      return BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);
    }
  }
}