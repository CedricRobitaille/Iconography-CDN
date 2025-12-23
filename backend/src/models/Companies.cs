

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class Company
{
  // Id
  [Key]
  public int Id { get; set; }

  // Name
  [Required, StringLength(32)]
  public string Name { get; set; } = string.Empty;


  public CompanyTypes Type { get; set; }

  // UserId FK
  public int UserId { get; set; }
  [JsonIgnore] // Needed, otherwise, t
  public virtual User? User { get; set; } = null!;
  

  // Created_At
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;




  // ------------------------
  // Supplementary Structures
  // ------------------------
  public enum CompanyTypes
  {
    Personal, // 0
    Business // 1
  }
}