using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Backend.Models;
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

  // Created_At
  public DateTime Created_At { get; protected set; } = DateTime.UtcNow;
}