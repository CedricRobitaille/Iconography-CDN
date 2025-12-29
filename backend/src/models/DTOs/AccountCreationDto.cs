// Data Transfer Object for Account Registration/Creation

// When a user wants to create a new account/company, a Post request comes in like:
// {
//   "User": {
//     "Name": string,
//     "Email": string,
//     "Password": string,
//   }, 
//   "Company": {
//     "Name": string,
//     "Type": int,
//   }
// }

// When a user wants to join a team, a Post request comes in like:
// {
//   "User": {
//     "Name": string,
//     "Email": string,
//     "Password": string,
//     "CompanyId": int,
//     "Role": int,
//   }
// }

// Therefore, we need a DTO to handle the User and Company objs

public class AccountCreationDto
{
  public UserDto User { get; set; } = null!;
  public CompanyDto Company { get; set; } = null!;
}

public class CompanyJoinDto
{
  public UserDto User { get; set; } = null!;
}



// Models for the DTOs set above

public class UserDto
{
  public string Name { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
  public int CompanyId { get; set; }
  public int Role { get; set; }
}

public class CompanyDto
{
  public string Name { get; set; } = string.Empty;
  public int Type { get; set; }
}