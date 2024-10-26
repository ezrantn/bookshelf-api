'use strict';

import Hapi from "@hapi/hapi";
import { BooksController } from "./controller/BookController.js";

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: "localhost"
    });

    const booksController = new BooksController();

    server.route([
        {
            method: "POST",
            path: "/books",
            handler: (request, h) => booksController.addBook(request, h)
        },
        {
            method: "GET",
            path: "/books",
            handler: (request, h) => booksController.getAllBooks(request, h)
        },
        {
            method: "GET",
            path: "/books/{bookId}",
            handler: (request, h) => booksController.getBookById(request, h)
        },
        {
            method: "PUT",
            path: "/books/{bookId}",
            handler: (request, h) => booksController.updateBook(request, h)
        }
    ])

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
