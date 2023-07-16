# Movie ticket
Ticket booking project for SEA Compfest.
This website mainly created using Next.js + PrismaORM + MySql

## Configuration

 1. Clone this repository
 2. Install dependencies
	```bash
	yarn
	```
	or
	```
	npm install
	```
3. Copy  `.env.example` to `.env` then fill the environment variable.
4. Run your local database.
	 - You can use existing database but you have to synchronize env varibale with your database config
	 - Or run MySql using `docker compose up` and use my setup setup
5.  Change prisma provider to MySql (I use vercel storage postgress for production only).
    ```prisma
        // datasource db {
          // provider          = "postgresql"
          // url               = env("POSTGRES_PRISMA_URL") 
          // directUrl         = env("POSTGRES_URL_NON_POOLING") 
          // shadowDatabaseUrl = env("POSTGRES_URL_NON_POOLING")
        // }

        datasource db {
          provider = "mysql"
          url      = env("DATABASE_URL")
        }

    ```
6.  Setup database.
	I have create schema database using [prisma](https://www.prisma.io/docs/concepts/components/prisma-schema) and seeder for development
	``` bash
	yarn db:push // for create table schema
	yarn db:seed // for seeding
	```
7. Start development server
	```bash
	yarn dev
	```

## Task
### Mandatory
- Movie list
- Movie detail
- Top up balance and withdraw
- Booking ticket
- Pay or cancel ticket order
### Challange
 - Register and login
 - User have their own balance
 - User can track active ticket and ticket history
 - User can track waiting payment and payment history
### Deployment
- This project is deployed using vercel and vercel storage
### Extra
- Theater and Schedule. So i want to solve the real case problem for ticket booking. Each Theater have their own schedule for playing movies. User can choose where they want to watch the movies and select specific time when buying tickets.

