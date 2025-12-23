# User / Company Relationship Model

## Overview
Every user always operated within a company<br>
Stand-alone users automatically get a personal company<br>
Employees belong to shared companies<br>
> This avoids bloat and excessive conditional logic everywhere



## Database Schema

### Users
```SQL
Id INT PRIMARY KEY,
Email VARCHAR(32) UNIQUE,
Password_hash VARCHAR(64),
Name VARCHAR(32),
Created_at DATE,
```


### companies
```SQL
Id INT PRIMARY KEY,
Name VARCHAR(32)
Type ('personal', 'business')
Created_at DATE

CONSTRAINT fk_user
  FOREIGN KEY (Id)
  REFERENCES Users (Id)
```


### company_members
```sql
Id PRIMARY KEY,
Role ('owner', 'admin', 'employee'),
Created_at DATE,

CONSTRAINT Company_Id
  FOREIGN KEY (Id) 
  REFERENCES Companies (Id)

CONSTRAINT User_Id
  FOREIGN KEY (Id) 
  REFERENCES Users (Id)
```



## App-Level Logic

### On login:
```ts
currentCompany = selectedCompany || personalCompany
```

### On every query:
```ts
WHERE company_id = :currentCompanyId
```

### Permissions:
```
Use company_members.role to gate features
```



## Level Up Features

### Invite users
```
id
company_id
email
role
token
expires_at
```