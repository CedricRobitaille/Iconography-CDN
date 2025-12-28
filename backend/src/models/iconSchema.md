# Icon Models

## Overview
Every icon belongs to a company, and has an author<br>
Every icon has a set of properties, including tags<br>
A Icon <-> Tag Many to Many relationship is required.



## Database Schema

### Icons
```SQL
Id INT PRIMARY KEY,
Svg VARCHAR(MAX),
Name VARCHAR(64),
Style VARCHAR(32),
Type VARCHAR(32),
Category VARCHAR(32),
Created_at DATE,
Updated_at DATE
```


### Company_Icons
```SQL
Id PRIMARY KEY,

CONSTRAINT Icon_Id
  FOREIGN KEY (Id) 
  REFERENCES Icons (Id)

CONSTRAINT Company_Id
  FOREIGN KEY (Id) 
  REFERENCES Companies (Id)

CONSTRAINT User_Id
  FOREIGN KEY (Id) 
  REFERENCES Users (Id)
```


### Tags
```SQL
Id PRIMARY KEY,
Name VARCHAR(128)
```

### Icon_Tags
```SQL
Id PRIMARY KEY,
CONSTRAINT Icon_Id
  FOREIGN KEY (Id) 
  REFERENCES Icons (Id)

CONSTRAINT Tag_Id
  FOREIGN KEY (Id) 
  REFERENCES Tag (Id)
```


## Icon Creation

Upon creating an icon, the following JSON data would be provided:

```json
{
  "Icon": {
    "Name": "Rat",
    "Svg": "RatLineart",
    "Style": "Regular",
    "Type": "Line",
    "Category": "Animals",
    "Tags": [
        "Mouse",
        "Rat",
        "Rodent",
        "Small"
    ]
  },
  "User": {
    "Id": 1
  }
}
```

With that information, there are a few relationships that must be set.
1. Create an Icon
  - Set the Name, SVG File, Style, Type, and Category
2. Set up the Icon -> Company Relationship
  - Require IconID, CompanyID, AuthorId
3. Set up Icon <-> Tag Relationship
  1. Create a new Tag if it doesn't exist
  2. Relate them through IconId and TagId


## Icon Querying

### Get all icons

```

```

### Get icons by Company


### Get specific Icon


### Search for Icons


### Query Params to Filter Icons

