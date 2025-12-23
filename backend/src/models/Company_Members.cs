

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class Company_Members
{
  // Id
  public int Id { get; set; }


  // Type
  [Required]
  public MemberRoles Type { get; set; }


  // UserId FK
  [Required, ForeignKey("UserId")]
  public virtual User User { get; set; } = null!;
  public int UserId { get; set; }


  // CompanyId FK
  [Required, ForeignKey("CompanyId")]
  public virtual Company Company { get; set; } = null!;
  public int CompanyId { get; set; }


  // Created_At
  public DateTime Created_At { get; protected set; } = DateTime.UtcNow;




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