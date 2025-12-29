public class CompanyPatchDto
{
  public string? Name { get; set; }
  public int? Type { get; set; }
  public int? OwnerId { get; set; }
}

public class CompanyPutDto
{
  public string Name { get; set; } = null!;
  public int Type { get; set; }
  public int OwnerId { get; set; }
}

// Key: PK
// Name: string
// Type: (CompanyTypes)
// OwnerId: int
// CreatedAt: date