

type User = {
  id: number;
  name: string;
  role: "admin" | "designer" | "developer";
  company: string;
}

const activeUser: User = {
  id: 1,
  name: "Cedric Robitaille",
  role: "admin",
  company: "General Assembly"
}

export default activeUser;