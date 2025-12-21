export interface User {
  id: number;
  name: string;
  role: "admin" | "designer" | "developer";
  company: string;
}

// export const activeUser: User = {
//   id: 1,
//   name: "Cedric Robitaille",
//   role: "admin",
//   company: "General Assembly"
// }