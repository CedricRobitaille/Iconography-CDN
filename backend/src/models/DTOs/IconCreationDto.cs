// When a user creates a new Icon, a POST request comes in like:
// {
//   "Icon": {
//     "Name": string,
//     "Svg": string
//   },
//   "Company": {
//     "Id": int
//   },
//   "Author": {
//     "Id": int
//   }
// }
// Therefore, we need a DTO to handle the Icon, Company, and Author Objs


public class IconCreationDto
{
  public OwnerDto Company { get; set; } = null!;
  public AuthorDto User { get; set; } = null!;
  public IconDto Icon { get; set; } = null!;
}






// Models for the DTOs set above

public class OwnerDto // Company
{
  public int Id { get; set; }
}

public class AuthorDto // User
{
  public int Id { get; set; }
}

public class IconDto // Icon
{
  public string Name { get; set; } = string.Empty;
  public int Svg { get; set; }
}