# Bookshelf API Documentation

## Table of Contents

- [Bookshelf API Documentation](#bookshelf-api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
  - [Tech Stack](#tech-stack)
    - [Core Technologies](#core-technologies)
    - [Dependencies](#dependencies)
  - [Server Configuration](#server-configuration)
    - [Port Setting](#port-setting)
    - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
    - [Create Book](#create-book)
      - [Server Generated Properties](#server-generated-properties)
      - [Example Response Object](#example-response-object)
      - [Success Response](#success-response)
      - [Error Responses](#error-responses)
    - [Get All Books](#get-all-books)
      - [Success Response](#success-response-1)
      - [Empty Collection Response](#empty-collection-response)
    - [Get Book Detail](#get-book-detail)
      - [Success Response](#success-response-2)
      - [Error Response](#error-response)
    - [Update Book](#update-book)
      - [Success Response](#success-response-3)
      - [Error Responses](#error-responses-1)
    - [Delete a Book](#delete-a-book)
      - [Success Response](#success-response-4)
      - [Error Response](#error-response-1)

## Overview

This documentation describes the requirements and specifications for the Bookshelf API implementation.

## Getting Started

### Prerequisites

- Node.js installed on your system
- npm (Node Package Manager)

### Installation Steps

1. Clone the repository:

   ```shell
    git clone https://github.com/ezrantn/bookshelf-api.git
   ```

2. Install the dependencies:

   ```shell
    npm install
   ```

    This command will automatically install all necessary dependencies defined in `package.json`, including:

    - **@hapi/hapi**
    - **nanoid**
    - **nodemon** (dev dependency)
    - **eslint** (dev dependency)
    - **prettier** (dev dependency)

3. Run the application:

   ```shell
    # For production
    npm run start

    # For development (with auto-reload)
    npm run start-dev
   ```

   The API will be available at <http://localhost:9000>

## Tech Stack

### Core Technologies

- **Language**: JavaScript (Node.js)
- **Framework**: Hapi.js - A rich framework for building applications and services
- **Runtime**: Node.js

### Dependencies

- **nanoid** - For generating unique book IDs
- **nodemon** - Development dependency for auto-restarting server
- **eslint** - For code linting and maintaining code quality
- **prettier** - Code formatter for consistent code style

## Server Configuration

### Port Setting

- The application must run on port `9000`
- If development requires a different port, ensure to change it back to `9000` before submission

### Running the Application

- The application must be started using the `npm run start` command
- Configure the `package.json` with the following scripts:

    ```json
    {
        "name": "submission",
        "scripts": {
            "start": "node src/index.js",
            "start-dev": "nodemon src/index.js"  // Optional for development
        }
    }
    ```

- **IMPORTANT**: The application must **NOT** run using `nodemon` in production (via `start` script)

## API Endpoints

### Create Book

Add a new book to the collection.

Endpoint: POST `/books`

Request Body:

```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

#### Server Generated Properties

The server will generate additional properties for each book:

- `id`: Unique identifier (using nanoid)
- `finished`: Boolean indicating if book is finished (calculated from `pageCount === readPage`)
- `insertedAt`: Timestamp of creation (ISO string)
- `updatedAt`: Timestamp of last update (initially same as `insertedAt`)

#### Example Response Object

```json
{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}
```

#### Success Response

- Status Code: `201`
- Response:

```json
{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": "1L7ZtDUFeGs7VlEt"
    }
}
```

#### Error Responses

1. Missing Book Name

   - Status Code: `400`
   - Response:


        ```json
        {
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        }
        ```

2. Invalid Read Page

   - Status Code: `400`
   - Response:


        ```json
        {
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }
        ```

### Get All Books

Retrieve all books from the collection.

Endpoint: GET `/books`

#### Success Response

- Status Code: `200`
- Response:

```json
{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
            }
        ]
    }
}
```

#### Empty Collection Response

```json
{
    "status": "success",
    "data": {
        "books": []
    }
}
```

### Get Book Detail

Retrieve detailed information about a specific book.

Endpoint: GET `/books/{bookId}`

#### Success Response

- Status Code: `200`
- Response:

```json
{
    "status": "success",
    "data": {
        "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
        }
    }
}
```

#### Error Response

- Status Code: `404`
- Response:

```json
{
    "status": "fail",
    "message": "Buku tidak ditemukan"
}
```

### Update Book

Update an existing book's information.

Endpoint: PUT `/books/{bookId}`

Request Body:

```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

#### Success Response

- Status Code: `200`
- Response:

```json
{
    "status": "success",
    "message": "Buku berhasil diperbarui"
}
```

#### Error Responses

1. Missing Book Name

   - Status Code: `400`
   - Response:


        ```json
            {
                "status": "fail",
                "message": "Gagal memperbarui buku. Mohon isi nama buku"
            }
        ```

2. Invalid Read Page

   - Status Code: `400`
   - Response:


        ```json
            {
                "status": "fail",
                "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
            }
        ```

3. Book Not Found

   - Status Code: `404`
   - Response:


        ```json
            {
                "status": "fail",
                "message": "Gagal memperbarui buku. Id tidak ditemukan"
            }
        ```

### Delete a Book

Remove a book from the collection.

Endpoint: DELETE `/books/{bookId}`

#### Success Response

- Status Code: `200`
- Response:

```json
{
    "status": "success",
    "message": "Buku berhasil dihapus"
}
```

#### Error Response

- Status Code: `404`
- Response:

```json
{
    "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```
