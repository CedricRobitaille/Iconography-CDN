using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models;

// Contains:
// Key: PK
// CompanyId: int(FK)
// Name: string
// IconCount: int
// MonthlyUses: int
// UpdatedAt: date
// CreatedAt: date

public class Collection
{
  // Id
  [Key]
  public int Id { get; set; }

  // CompanyId 
  public int CompanyId { get; set; }
  [JsonIgnore]
  public virtual Company Company { get; set; } = null!;

  [Required, StringLength(32)]
  public string Name { get; set; } = null!;

  public int IconCount { get; set; }

  public int MonthlyUses { get; set; }

  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

}