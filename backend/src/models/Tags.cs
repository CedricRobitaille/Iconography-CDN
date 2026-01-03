using System.ComponentModel.DataAnnotations;


namespace Backend.Models;

public class Tag
{
  // Id
  [Key]
  public int Id { get; set; }

  // Name
  [StringLength(128), Required]
  public string Name { get; set; } = string.Empty;

  // Type
  [StringLength(32), Required]
  public string Type { get; set; } = string.Empty;

  // IconCount
  [Required]
  public int IconCount { get; set; }
}