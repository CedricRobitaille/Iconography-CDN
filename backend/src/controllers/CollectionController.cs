using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;


namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]

  public class CollectionController : ControllerBase
  {
    private readonly MyDbContext _context;
    public CollectionController(MyDbContext context)
    {
      _context = context;
    }

    // POST '/api/collection'
    [HttpPost]
    public async Task<ActionResult<Collection>> Create([FromBody] CollectionPostDto dto)
    {

      // Data comes in as follows:
      // {
      //   "Name" : "Default",
      //   "CompanyId": 3,
      //   "IconId": 1 (Optional)
      // }

      // Start transaction
      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {
        // Confirm company exists
        var company = await _context.Companies.FindAsync(dto.CompanyId);
        if (company == null)
        {
          await transaction.RollbackAsync();
          return NotFound($"Company {dto.CompanyId} does not exist");
        } 

        // Create collection elem
        var collection = new Collection
        {
          Name = dto.Name,
          CompanyId = dto.CompanyId
        };

        _context.Collections.Add(collection);
        await _context.SaveChangesAsync();

        // Confirm icon exists
        if (dto.IconId.HasValue)
        {
          var icon = await _context.Icons.FindAsync(dto.IconId);
          if (icon == null)
          {
            await transaction.RollbackAsync();
            return NotFound($"Icon {dto.IconId} does not exist");
          }
          // Increment IconCount on collection
          collection.IconCount = 1;

          // Connect the icon to the collection
          var collection_icon = new Collection_Icon
          {
            IconId = icon.Id,
            CollectionId = collection.Id
          };

          _context.Collection_Icons.Add(collection_icon);
          await _context.SaveChangesAsync();
        }

        await transaction.CommitAsync();

        return CreatedAtAction(
          nameof(GetById),                  // Pointer to URL
          new { id = collection.Id },       // URI
          new { Collection = collection }   // Json Body Data
        );

      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
    }






    //  GET '/api/collection'
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Collection>>> GetAll()
      => await _context.Collections.ToListAsync();



    // GET '/api/collection/id'
    [HttpGet("{id}")]
    public async Task<ActionResult<Collection>> GetById(int id)
    {
      var collection = await _context.Collections.FindAsync(id);
      if (collection == null) return NotFound($"User {id} does not exist");
      return Ok(collection);
    }


    // Put '/api/collection/id'
    [HttpPut("{id}")]
    public async Task<ActionResult<Collection>> Put(int id, [FromBody] CollectionPutDto dto)
    {

      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {
        // Get queried collection
        var collection = await _context.Collections.FindAsync(id);
        if (collection == null)
        {
          await transaction.RollbackAsync();
          return NotFound($"Collection {id} does not exist");
        } 

        collection.CompanyId = dto.CompanyId;
        collection.Name = dto.Name;
        collection.IconCount = dto.IconCount;

        // Optinal value to edit
        if (dto.MonthlyUses.HasValue)
          collection.MonthlyUses = dto.MonthlyUses.Value;

        collection.UpdatedAt = DateTime.UtcNow;

        // Mark the entity as modified
        _context.Collections.Update(collection);
        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return Ok(new{
          message = "Collection Edited Successfully.",
          Collection = collection
        });
      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
    }


    // Patch '/api/collection/id'
    [HttpPatch("{id}")]
    public async Task<ActionResult<Collection>> Patch(int id, [FromBody] CollectionPatchDto dto)
    {
      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {
        var collection = await _context.Collections.FindAsync(id);
        if (collection == null)
        {
          await transaction.RollbackAsync();
          return NotFound($"Collection {id} does not exist");
        }

        if (dto.CompanyId.HasValue)
          collection.CompanyId = dto.CompanyId.Value;

        if (!string.IsNullOrWhiteSpace(dto.Name))
          collection.Name = dto.Name;

        if (dto.IconCount.HasValue)
          collection.IconCount = dto.IconCount.Value;

        if (dto.MonthlyUses.HasValue)
          collection.MonthlyUses = dto.MonthlyUses.Value;

        collection.UpdatedAt = DateTime.UtcNow;

        // Mark the entity as modified
        _context.Collections.Update(collection);
        await _context.SaveChangesAsync();

        return Ok(new
        {
          message = "Collection Edited Successfully.",
          Collection = collection
        });
      }
      catch
      {
        await transaction.RollbackAsync();
        throw;
      }
    }



    // Delete '/api/collection/id
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var collection = await _context.Collections.FindAsync(id);
      if (collection == null) return NotFound($"Collection {id} does not exist");

      _context.Collections.Remove(collection);
      await _context.SaveChangesAsync();
      return NoContent();
    }
  }
}