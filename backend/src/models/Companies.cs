

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models;

// Contains:
// Key: PK
// Name: string
// Type: (CompanyTypes)
// OwnerId: int
// CreatedAt: date
public class Company
{
  // Id
  [Key]
  public int Id { get; set; }


  // Name
  [StringLength(32)]
  public string Name { get; set; } = string.Empty;


  public CompanyTypes Type { get; set; }


  // UserId FK
  public int? OwnerId { get; set; }
  [JsonIgnore] // Needed, otherwise, it appears in the response
  public virtual User Owner { get; set; } = null!;


  // Employees
  // Used for navigation and EF management
  public ICollection<User> Employees { get; set; } = new List<User>();


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