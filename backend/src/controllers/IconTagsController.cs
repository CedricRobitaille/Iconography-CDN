using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]

  public class IconTagController : ControllerBase
  {
    private readonly MyDbContext _context;

    public IconTagController(MyDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Icon_Tag>>> GetAll()
      => await _context.Icon_Tags.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Icon_Tag>> GetById(int id)
    {
      var iconTag = await _context.Icon_Tags.FindAsync(id);
      if (iconTag == null) return NotFound($"Icon Tag RL {id} does not exist");
      return Ok(iconTag);
    }
  }
}