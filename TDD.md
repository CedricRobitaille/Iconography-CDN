# GA - Final Project

>**The Problem:**<br>
>In a team composed of both a design team and a development team,<br>
>To add an icon to a website, the standard workflow is as follows:
>1. Designers make an icon for the layout and awaits approval
>2. Designers export, package, then deliver the icons to the developers
>3. Developers receive the icons, unpack them, and convert from .svg to raw svg
>4. Developers upload icon to file structure, and finally, add it to the website<br>
>
> This is actually something I have had a lot of experience with, and has been a big pain point in the last team I was on. It would have been so much easier to use a service like FontAwesome, however, the design team required specific styles/icons to be used, and FA has restrictions on custom iconsleading to constant back-and-forths, revisions, and lost time.

## 1. Project Description
To solve the problem, I am looking to create an extensive icon library and toolkit application enabling teams to add custom SVG icons to their web projects. This tool will have a few key features, that make them uniquely different from any other icon CDN / FTP microservice.

1. **Team based library management.**
    - Designers can select icons from the global icon library, and add it to their team's collection.
    - This ensures that the icon packs accessible to developers are vetted and approved by the design team.
    - The designers can add / edit / remove icons at will, enforcing changes on the developers.
2. **Icon Builder / Editor**
    - An icon builder in-app that'll enable designers to build / edit without needing to open Adobe Illustrator.
    - Standardize systems like sizes, stroke weights, fill-styles, for consistency, and predictability.
    - The designer will also be able to edit uploaded / library icons to fit their brand's needs and guidelines.
3. **Convert SVG library to .woff2**
    - Traditional .svg files cannot be customized on-page with html/css
    - RAW svg data, on the other hand, can be edited on-the-fly for hover effects and animations
    - In the backend, using `aspose.font`, we'll convert the collection into a woff2 file for a more seemless svg web integration
    - .woff2 was selected as it's specifically made for web, with the best web-compression, omitting things like ligatures, needed for print.
4. **Extensive icon library / marketplace**
    - To get people/companies off the ground running, we will provide a few sets of pre-made icons, free to use, and add to company's projects
    - Would be great to create a ecosystem where users can create, and share their icons for others (Similar to canva marketplace)

## 2. Tech Stack
A bunch of research was done to tally up the what technologies are currently being requested for by companies in Anaheim, California.
From that research, the following findings were recorded:

| Languages  | Count |   | Backend Framework | Count |   | Frontend Framework | Count |   | Databases     | Count |
|------------|-------|---|-------------------|-------|---|--------------------|-------|---|---------------|-------|
| Javascript | 125   |   | Java              |       |   | React              | 96    |   | MySQL         | 39    |
| Typescript | 46    |   | SprintBoot        | 17    |   | Next.js            | 32    |   | PostgreSQL    | 33    |
| Python     | 54    |   | Sprint            | 12    |   | Vue                | 28    |   | MongoDB       | 29    |
| Java       | 28    |   |                   |       |   | Angular            | 19    |   | Redis         | 18    |
| C#         | 26    |   | C#                |       |   | Svelte             | 3     |   | Elasticsearch | 10    |
| PHP        | 21    |   | .NET              | 22    |   | Nuxt.js            | 2     |   | DynamoDB      | 6     |
| Go         | 9     |   |                   |       |   |                    |       |   |               |       |
| Ruby       | 7     |   |                   |       |   |                    |       |   |               |       |
| C++        | 6     |   |                   |       |   |                    |       |   |               |       |

From this research, I came out with two decisions...
1. On the front-end, I would either need to do Vue ot Angular.<br>
    I see my person value proposition being someone who can deliver end-to-end web solutions... From concept to design to execution. And the companies that are in need for those people are not pre-existing companies, rather, up-and coming startups who don't have a pre-existing codebase/website. This lead me to go down the route of Vue, as it is less of a legacy framework, it should better fit the need and desire for the companies who would be looking to hire my value proposition.

2. On the back-end, I would either need to do C# with .NET or Java with SpringBoot.
    Out of these three, the only valid options I could see was Java and C#. These two languages/frameworks were neck-and-neck across the board and there really wasn't a difference in who or why people chose one over the other. So, instead, my decision was based on the product I am looking to make. As my product would be focusing on bulk distribution of files/data, C#'s speed and lower memory usage would be lead to a better product, so... I've chose C#.

In the end, I've decided to go with:
| Frontend   | Backend | Database |
|------------|---------|----------|
| Typescript | C#      | MySQL    |
| Vue.js     | .NET    | NuGet    |

Additional Libraries/technologies
1. Aspose.Font<br>
    A C# .NET font loading / drawing library.<br>
    If we get to the point of converting .SVG to .WOFF2, this library will act as the converter.

## 3. Deployment Stages

### MVP
- Account Creation
- Font Libraries
- Company Collections
- Team Roles / Permissions
- FTP Server for files
- API-Keys / Access Control for FTP


### Level Ups
- SVG Creation
- SVG Editor
- SVG -> WOFF2

### Roadmap:

| Stage 1         | Day |   | Stage 2                           | Day  |   | Stage 3      | Day |
|-----------------|-----|---|-----------------------------------|------|---|--------------|-----|
| Planning Doc    | 1   |   | Frontend to<br>Backend connection | 6    |   | Icon Maker   | ?   |
| Wireframe       | 1-2 |   | Account Creation                  | 6-7  |   | Icon Editor  | ?   |
| Learn Vue       | 2   |   | Access Restrictions               | 7    |   | SVG to WOFF2 | ?   |
| Library Page    | 2-4 |   | FTP Server                        | 7-10 |   |              |     |
| Company Page    | 2-4 |   |                                   | 8    |   |              |     |
| Collection Page | 3-5 |   |                                   | 9    |   |              |     |
| API Setup       | 4-6 |   |                                   | 9    |   |              |     |



## Endpoints

### Controllers
1. **AuthController**<br>
    Handling account creation and user authentication
2. **CollectionController**<br>
    Handling CRUD on company-wide icon library
3. **IconController**<br>
    Handing CRUD on individual icons.<br>
    This is broken into 2 parts, the icon preview, and the icon editor

### `AuthController`

|  Method  |       Path       |                  Purpose                 |       Render / Dedirect      |
|:--------:|:----------------:|:----------------------------------------:|:----------------------------:|
| `GET`    | `/auth/login`    | Render login page                        | res.render("/auth/login")    |
| `POST`   | `/auth/login`    | Validate credentials, create session     | res.redirect("/boards")      |
| `GET`    | `/auth/register` | Render registration form                 | res.render("/auth/register") |
| `POST`   | `/auth/register` | Create user and auto-login               | res.redirect("/")            |
| `POST`   | `/auth/logout`   | Destroy session and redirect             | res.redirect("/")            |
| `GET`    | `/auth/:userId`  | Return session user info (for dashboard) | res.render("/")              |
| `DELETE` | `/auth/:userId`  | Delete user, and redirect                | res.redirect("/")            |


### `CollectionController`

|  Method  |        Path       |                 Purpose                |        Render / Dedirect        |
|:--------:|:-----------------:|:--------------------------------------:|:-------------------------------:|
| `GET`    | `/collection/`    | View all collections available         | res.render("/collection")       |
| `GET`    | `/collection/:id` | View individual collection with icons  | res.redirect("/collection/:id") |
| `POST`   | `/collection`     | Create a new collection                | res.render("/collection/:id")   |
| `PUT`    | `/collection/:id` | Edit a collection's properties         | res.redirect("/collection/:id") |
| `DELETE` | `/collection/:id` | Destroy a collection and it's contents | res.redirect("/collection/")    |


### `IconController`

|  Method  |     Path     |                Purpose               |       Render / Dedirect      |
|:--------:|:------------:|:------------------------------------:|:----------------------------:|
| `GET`    | `/icons/`    | View all icons owned by the company  | res.render("/icons")         |
| `GET`    | `/icons/:id` | View individual icon                 | res.render("/icons/:id")     |
| `GET`    | `/edit/:id`  | Retreive an icon for the icon editor | res.render("/edit/:id")      |
| `POST`   | `/icons/:id` | Create a new icon                    | res.redirect("/icons/:id")   |
| `PUT`    | `/icons/:id` | Edit description of an icon          | res.redirect("/icons/:id")   |
| `PUT`    | `/edit/:id`  | Edit the design of the icon          | res.redirect("/edit/:id")    |
| `DELETE` | `/icons/:id` | Remove icon from company profile     | res.redirect("/collection/") |


## Models

### `User`
WIP

### `Company`
WIP

### `Collection`
WIP

### `Icons`
WIP


## Wireframes
WIP






