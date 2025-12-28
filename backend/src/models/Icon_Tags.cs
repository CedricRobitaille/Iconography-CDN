

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class Icon_Tag
{
  // Id
  public int Id { get; set; }


  // IconId FK
  [Required]
  public int IconId { get; set; }
  [JsonIgnore]
  public virtual Icon Icon { get; set; } = null!;


  // TagId FK
  [Required]
  public int TagId { get; set; }
  [JsonIgnore]
  public virtual Tag Tag { get; set; } = null!;
}