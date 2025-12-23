// Data Transfer Object for Account Registration/Creation

// When a user wants to create a new account/company, a Post request comes in like:
//{
//  "User": {
//     "Name": "Stephen",
//     "Email": "sLiu@hotmail.com",
//     "Password": "i32312tge"
//   }, 
//   "Company": {
//     "Name": "CBU",
//     "Type": 1
//   }
//}
// Therefore, we need a DTO to handle the User and Company objs

public class AccountCreationDto
{
  public UserDto User { get; set; } = null!;
  public CompanyDto Company { get; set; } = null!;
}


// Data Transfer Object for Creating a new Member of a Company

// When a user wants to join a team, a Post request comes in like:
//{
//  "User": {
//     "Name": string,
//     "Email": string,
//     "Password": string
//   }, 
//   "Company": {
//     "Id": int
//   }
//   "Member": {
//     "Type": int
//   }
//}
// Therefore, we need a DTO to handle the User, Company, and Member objs

public class MemberCreationDto
{
  public UserDto User { get; set; } = null!;
  public CompanyDto Company { get; set; } = null!;
  public MemberDto Company_Member { get; set; } = null!;
}







// Models for the DTOs set above

public class UserDto
{
  public string Name { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
}

public class CompanyDto
{
  public string Name { get; set; } = string.Empty;
  public int Type { get; set; }
  public int Id { get; set; }
}

public class MemberDto
{
  public int Type { get; set; }
}