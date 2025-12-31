// Data transfer objkect for Collections

// When a user creates a new collection, a post request comes in like:
// {
//   "Collection" : {
//     "Name" : "Default",
//     "CompanyId": 1,
//     "IconId": 1 (Optional)
//   }
// }


public class CollectionPostDto
{
  public string Name { get; set; } = null!;
  public int CompanyId { get; set; }
  public int? IconId { get; set; }
  public int? MonthlyUses { get; set; }
}

public class CollectionIconDto
{
  public int IconId { get; set; }
}

public class CollectionPutDto
{
  public int CompanyId { get; set; }
  public string Name { get; set; } = null!;
  public int IconCount { get; set; }
  public int? MonthlyUses { get; set; }
}

public class CollectionPatchDto
{
  public int? CompanyId { get; set; }
  public string? Name { get; set; } = null!;
  public int? IconCount { get; set; }
  public int? MonthlyUses { get; set; }
}