// When a user creates a new Icon, a POST request comes in like:
// {
//   "Icon": {
//     "Name": string,
//     "Svg": string
//     "Style": string,
//     "Type": string,
//     "Category": string,
//     "Tags": array[]
//   },
//   "Company": {
//     "Id": int
//   },
//   "User": {
//     "Id": int
//   }
// }
// Therefore, we need a DTO to handle the Icon, Company, and Author Objs


public class IconCreationDto
{
  // public OwnerDto Company { get; set; } = null!;
  public IconAuthorDto User { get; set; } = null!;
  public IconDto Icon { get; set; } = null!;
  public IconOwnerDto Company { get; set; } = null!;
}

public class IconPutDto
{
  public string Name { get; set; } = null!;
  public string Svg { get; set; } = null!;
  public string Style { get; set; } = null!;
  public string Type { get; set; } = null!;
  public string Category { get; set; } = null!;
  public List<int> TagIds { get; set; } = new();
}


public class IconPatchDto
{
  public string? Name { get; set; }
  public string? Svg { get; set; }
  public string? Style { get; set; }
  public string? Type { get; set; }
  public string? Category { get; set; }

  // Optional: only processed if present
  public List<int>? TagIds { get; set; }
}




public class IconReadDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string Svg { get; set; } = string.Empty;
  public string Style { get; set; } = string.Empty;
  public string Type { get; set; } = string.Empty;
  public string Category { get; set; } = string.Empty;
  public List<IconTagDto> Tags { get; set; } = new();
}

// Models for the DTOs set above

public class IconDto // Icon
{
  public string Name { get; set; } = string.Empty;
  public string Svg { get; set; } = string.Empty;
  public string Style { get; set; } = string.Empty;
  public string Type { get; set; } = string.Empty;
  public string Category { get; set; } = string.Empty;
  public string[] Tags { get; set; } = Array.Empty<string>();
}


public class IconAuthorDto // User
{
  public int Id { get; set; }
}

public class IconOwnerDto // Company
{
  public int Id { get; set; }
}

public class IconTagDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
}