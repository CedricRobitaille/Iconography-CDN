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

    [HttpGet("filters")]
    public async Task<ActionResult<IEnumerable<Tag>>> GetFilters()
    {
      // Get all tags where Type != "Custom"
      var tags = await _context.Tags
          .Where(t => t.Type != "Custom")
          .ToListAsync();

      return Ok(tags);
    }

    [HttpGet("myfilters/{id}")]
    public async Task<ActionResult<IEnumerable<Tag>>> GetMyFilters(int id)
    {
      // Get all tags where Type != "Custom"
      var tags = await _context.Company_Icons
        .Where(ci => ci.CompanyId == id)
        .Select(ci => ci.Icon)
        .SelectMany(i => i.Icon_Tags)
        .Select(it => it.Tag)
        .Where(t => t.Type != "Custom")
        .Distinct()
        .ToListAsync();

      return Ok(tags);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Tag>> GetById(int id)
    {
      var tag = await _context.Tags.FindAsync(id);
      if (tag == null) return NotFound($"Icon Tag RL {id} does not exist");
      return Ok(tag);
    }
  }
}