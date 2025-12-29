using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models;


// Contains:
// Key: PK
// Name: string
// Email: string
// Password_Hash
// CompanyId: int(FK)
// Role: (MemberRoles)
// CreatedAt: date
public class User
{
  // Square Brackets append metadata to the 
  // item so it can be used by other parts.

  // Id
  [Key]
  public int Id { get; set; }


  // Name
  [StringLength(32), Required]
  public string Name { get; set; } = string.Empty;


  // Email
  [StringLength(32), Required, EmailAddress]
  public string Email { get; set; } = string.Empty;


  // Password
  [StringLength(128), Required]
  public string Password_Hash { get; set; } = string.Empty;


  // CompanyId FK
  public int? CompanyId { get; set; }
  [JsonIgnore]
  public virtual Company Company { get; protected set; } = null!;


  // Role
  [Required]
  public MemberRoles Role { get; set; }


  // Created_At
  public DateTime CreatedAt { get; protected set; } = DateTime.UtcNow;




  // ------------------------
  // Supplementary Structures
  // ------------------------
  public enum MemberRoles
  {
    Owner,
    Admin,
    Designer,
    Developer
  }
}