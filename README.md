## Project Management Dashboard Web App

### Stack:

- **Frontend**: Next.js, Tailwind CSS, Redux Toolkit, Redux Toolkit Query
- **Backend**: Node.js with Express, Prisma (PostgreSQL ORM)
- **Database**: PostgreSQL with PgAdmin
- **Cloud**: AWS VPC, AWS EC2, AWS RDS, AWS S3, AWS Amplify, AWS Cognito, AWS Lambda, AWS API Gateway, AWS API Gateway Authorizer

### Requirements:

- [Node.js](https://nodejs.org/en/download/package-manager)
- [npm](https://nodejs.org/en/download/package-manager)
- [PostgreSQL](https://www.postgresql.org/download/)
- [PgAdmin](https://www.pgadmin.org/download/)

### Installation Steps

1. Clone the repository:

```
git clone [git url]
```

2. Install dependencies in both client and server:

```
cd client
npm i

cd ..

cd server
npm i
```

3. Set up the database and load seed data:

```
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

4. Configure environment variables:

- `.env` for server settings (PORT, DATABASE_URL)
- `.env.local` for client settings (NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_COGNITO_USER_POOL_ID, NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID)

5. Run the application:

```
cd server
npm run dev

cd ..

cd client
npm run dev
```

### Deployment

- **AWS Amplify**: https://main.dtei7t07t9hwe.amplifyapp.com
