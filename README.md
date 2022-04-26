# Backend Developer Test

## Description

The test consists of creating an applications that provides the following:

1 – Application shall provide a migration that can create and destroy two tables:
a) Users table
b) Job table

2 – Application shall provide migrations to populate and destroy the previous tables with the provided sample data, compliant with the relations between them. So, at this example, user table has a 1 – 1 relation with job table. So, one user can have 1 job description.

3 – Application shall provide an API with the 4 standard methods (GET, POST, PATCH, DELETE), i.e:
a) GET must have 2 options: with and without user id, so the first one will respond with a list of users, and the second one, details of the specific user.
b) POST method must enable to create a user with all needed data such as provided at sample data file.
c) PATCH method must enable to update a user data by providing a user id.
d) DELETE method must enable user deletion. This method should not allow to delete a user that is bounded to another as its superior. So, if user 1 has user 2 as its manager, user 2 cannot be deleted until another manager is set for user 1.

4 – You can choose whatever framework, language and database you want, as long as it would make possible to run it locally at any operational system by installing dependencies and running the start command, so installers are discouraged. Also, database must be one that enables us to execute with docker container.

5 – Result must be added to a public git repository and shared with us.

6 – README file is a welcome plus. Also, methods to handle job data is a welcome plus.

7 – The deadline for this test will be provided at the email body.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# 1. Copy the .env.sample to .env
$ cp .env.sample .env

# 2. Run the database container
$ docker-compose up

# 3. Execute the migration
$ npx prisma migrate dev
```
