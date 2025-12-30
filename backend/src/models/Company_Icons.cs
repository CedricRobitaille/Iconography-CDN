

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class Company_Icon
{
  // Id
  [Key]
  public int Id { get; set; }


  // UserId FK
  [Required]
  public int IconId { get; set; }
  [JsonIgnore]
  public virtual Icon Icon { get; set; } = null!;


  // CompanyId FK
  [Required]
  public int CompanyId { get; set; }
  [JsonIgnore]
  public virtual Company Company { get; set; } = null!;


  // AuthorId FK (User)
  [Required]
  public int UserId { get; set; }
  [JsonIgnore]
  public virtual User User { get; set; } = null!;


  // Created_At
  public DateTime CreatedAt { get; protected set; } = DateTime.UtcNow;


  // Updated_At
  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

}