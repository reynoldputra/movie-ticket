# Movie ticket
Ticket booking project for SEA Compfest
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
3. Copy  `.env.example` to `.env` then fill the environment variable
4. Run your local database
	 - You can use existing database but you have to synchronize env varibale with your database config
	 - Or run MySql using `docker compose up` and use my setup setup
5.  Setup database
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
### Challange
### Deployment
### Extra

