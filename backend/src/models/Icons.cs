using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public class Icon
{
  public int Id { get; set; }

  [Required, StringLength(64)]
  public string Name { get; set; } = string.Empty;

  [Required, StringLength(32)]
  public string Style { get; set; } = string.Empty;

  [Required, StringLength(32)]
  public string Type { get; set; } = string.Empty;

  [Required, StringLength(32)]
  public string Category { get; set; } = string.Empty;

  [Required]
  public string Svg { get; set; } = string.Empty;


  public ICollection<Icon_Tag> Icon_Tags { get; set; } = new List<Icon_Tag>();
}