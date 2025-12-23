using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public class Icon
{
  public int Id { get; set; }

  [Required, StringLength(64)]
  public string Name { get; set; } = string.Empty;

  [Required]
  public string svg { get; set; } = string.Empty;
}