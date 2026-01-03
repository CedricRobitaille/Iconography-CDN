export interface User {
  Id: number;
  Name: string;
  Email: string;
  CompanyId: number;
  Role: number;
  CreatedAt: Date;
}

export interface CreatedUserPayload {

}

export interface UpdatedUserPayload {
  Name?: string;
}