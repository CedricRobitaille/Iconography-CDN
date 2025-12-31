# Collection Relationship Models

## Overview
Every Collection belongs to a company.<br>
Every collection contains many icons.<br>
Every icon can belong to many collections.



## Database Schema

### Collections
```SQL
Id INT PRIMARY KEY,

CONSTRAINT Company_Id
  FOREIGN KEY (Id) 
  REFERENCES Companies (Id)

Name VARCHAR(32),

IconCount INT,

MonthlyUses INT,

UpdatedAt DATE,

Created_at DATE,
```


### Collection_Icons
```SQL
Id PRIMARY KEY,

CONSTRAINT Icon_Id
  FOREIGN KEY (Id) 
  REFERENCES Icons (Id)

CONSTRAINT Collection_Id
  FOREIGN KEY (Id) 
  REFERENCES Collection (Id)
```


## Icon Creation

Upon creating an Collection, the following JSON data would be provided:

```json
{
    "Name" : "MyFirstCollection",
    "CompanyId": 1,
    "IconId": 1 (Optional)
}
```

With that information, there are a few relationships that must be set.
1. Create an Collection
  - Set the Name, SVG File, Style, Type, and Category
2. If an icon is provided by default
  - Create a Collection <-> Icon Relationship
3. When an Icon is added to an existing Collection
  1. Increment iconCount variable
  2. Create a Collection <-> Icon Relationship
