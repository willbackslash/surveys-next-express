# Surveys App
preview url: http://surveys-next.vercel.app

## Stack
- NextJS
- Prisma 
- Postgres

## Getting Started
1. Update the .env file with your postgres database url
> DATABASE_URL="postgresql://....."

2. install dependencies:
> npm install

3. run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Database operations

## schema generation
prisma generate
Generates Prisma client based on the schema file.
> npx prisma generate

## db seed
prisma db seed
Seeds the database with initial data.
> npx prisma db seed
## migrate
prisma migrate
Creates a new migration file based on changes made to the Prisma schema.

> npx prisma migrate dev --name <migration-name>
