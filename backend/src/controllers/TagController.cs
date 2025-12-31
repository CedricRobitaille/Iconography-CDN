using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]

  public class TagController : ControllerBase
  {
    private readonly MyDbContext _context;

    public TagController(MyDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tag>>> GetAll()
      => await _context.Tags.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Tag>> GetById(int id)
    {
      var tag = await _context.Tags.FindAsync(id);
      if (tag == null) return NotFound($"Icon Tag RL {id} does not exist");
      return tag;
    }
  }
}