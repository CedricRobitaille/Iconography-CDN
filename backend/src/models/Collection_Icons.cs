
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class Collection_Icon
{
  //Id
  [Key]
  public int Id { get; set; }

  [Required]
  public int CollectionId { get; set; }
  public virtual Collection Collection { get; set; } = null!;

  [Required]
  public int IconId { get; set; }
  public virtual Icon Icon { get; set; } = null!; 

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}