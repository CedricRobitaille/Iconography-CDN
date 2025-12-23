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



    //  PUT '/api/user/id'
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, User user)
    {
      if (id != user.Id) return BadRequest();
      _context.Entry(user).State = EntityState.Modified;
      await _context.SaveChangesAsync();
      return NoContent();
    }



    //  DELETE '/api/user/id'
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null) return NotFound();
      _context.Users.Remove(user);
      await _context.SaveChangesAsync();
      return NoContent();
    }
  }
}