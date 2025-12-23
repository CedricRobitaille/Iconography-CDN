

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class Company_Member
{
  // Id
  public int Id { get; set; }


  // Type
  [Required]
  public MemberRoles Type { get; set; }


  // UserId FK
  [Required]
  public int UserId { get; set; }
  [JsonIgnore]
  public virtual User User { get; set; } = null!;
  

  // CompanyId FK
  [Required]
  public int CompanyId { get; set; }
  [JsonIgnore]
  public virtual Company Company { get; set; } = null!; 


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