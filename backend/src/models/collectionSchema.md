✅ Recommended Design (Efficient & Scalable)
1. Companies
companies
- id (PK)
- name

2. Icons
icons
- id (PK)
- company_id (FK → companies.id)
- name
- file_path

3. Collections
collections
- id (PK)
- company_id (FK → companies.id)
- name

4. Collection ↔ Icon (Join Table)
collection_icons
- collection_id (FK → collections.id)
- icon_id (FK → icons.id)
- sort_order (INT)
- added_at
PRIMARY KEY (collection_id, icon_id)

Why This Is the Best Approach
✔ Performance

Indexed lookups

Fast joins

Works with millions of rows

✔ Flexibility

Icons can belong to multiple collections

Easy reordering via sort_order

Easy future features (tags, favorites, etc.)

✔ Clean Queries

Get all icons in a collection (ordered):

SELECT i.*
FROM icons i
JOIN collection_icons ci ON ci.icon_id = i.id
WHERE ci.collection_id = ?
ORDER BY ci.sort_order;


Add an icon to a collection:

INSERT INTO collection_icons (collection_id, icon_id, sort_order)
VALUES (?, ?, ?);

Optional Enhancements (Very Common)
Enforce Company Isolation

If icons and collections must belong to the same company:

Enforce in application logic or

Add a composite constraint via triggers (MySQL limitation)

Soft Deletes

Add:

deleted_at DATETIME NULL


to icons and collections

Unique Collection Names Per Company
UNIQUE (company_id, name)

Rule of Thumb (Worth Remembering)

If you feel tempted to create tables dynamically, you almost always want rows instead.

If you want, I can:

Optimize this for very large icon libraries

Design it for multi-tenant SaaS

Show how to implement this cleanly in an ORM (Prisma, Sequelize, Eloquent, etc.)

Just tell me 👍