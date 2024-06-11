# Blog post operations using Express, TypeScript, GraphQL, Apollo, Sequelize, MySQL

This project is a web application that allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts. It uses Express.js as the web framework, TypeScript for type-safety, GraphQL for the API, Apollo Server for the GraphQL server, Sequelize as the ORM, and MySQL as the database.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Features](#features)

## Installation

1. Clone the repository:
```
git clone https://github.com/HariKrishna-9885699666/crud-express-ts-graphql-apollo-sequelize-mysql.git
cd crud-express-ts-graphql-apollo-sequelize-mysql
npm install
npm run migrate
npm run dev
```

## Environment Variables

The project requires the following environment variables to be set in the `.env` file:

- `DB_HOST`: The hostname of the MySQL database.
- `DB_USER`: The username for the MySQL database.
- `DB_PASSWORD`: The password for the MySQL database.
- `DB_NAME`: The name of the MySQL database.
- `DB_DIALECT`: The dialect of the database, in this case, `mysql`.

## Usage

Once the development server is running, you can access the GraphQL playground at `http://localhost:4000/graphql`. From here, you can perform the following operations:

- Query for a list of employees
- Create a new employee
- Update an existing employee
- Delete a employee
  
- Create a new blog post
- Update an existing blog post
- Delete a blog post

- Create a new comment
- Update an existing comment
- Delete a comment

The project also includes a basic API for handling CRUD operations on blog posts and comments.

## Features

- TypeScript for type-safety
- Express.js for the web framework
- GraphQL for the API
- Apollo Server for the GraphQL server
- Sequelize as the ORM for interacting with the MySQL database
- MySQL as the database

## Screenshots

## Create Employee
![Screenshot1](https://img001.prntscr.com/file/img001/mhJBcqXmTpmm1PVkVAlvFA.png)
)

## Update Employee
![Screenshot1](https://img001.prntscr.com/file/img001/UgWdTdTkTWCPs9VLv3TUxw.png)

## Get Employee
![Screenshot1](https://img001.prntscr.com/file/img001/7-DqIT8NToev9fY-RnCH7Q.png)

## Get All Employees
![Screenshot1](https://img001.prntscr.com/file/img001/gLiwgS2FQXSG9TMc18_fAg.png)

## Delete Employee
![Screenshot1](https://img001.prntscr.com/file/img001/6sR2gARqQzm03J-OCHARKA.png)

## Create Post
![Screenshot1](https://img001.prntscr.com/file/img001/SdBBhmtsQx6pt_6sIA79qg.png)

## Create Comment
![Screenshot1](https://img001.prntscr.com/file/img001/zKXma-4XQ9SnPSW-cJAWVA.png)
