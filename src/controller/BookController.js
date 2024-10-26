import { BookService } from "../service/BookService.js";

export class BooksController {
    constructor() {
        this.bookService = new BookService();
    }

    async addBook(request, h) {
        try {
            const newBook = await this.bookService.addBook(request.payload);

            const response = {
                status: "success",
                message: "Buku berhasil ditambahkan",
                data: {
                    bookId: newBook.id
                }
            }

            return h.response(response).code(201);
        } catch (error) {
            return h.response({status: "fail", message: error.message}).code(400);
        }
    }

    async getAllBooks(request, h) {
        try {
            const allBooks = await this.bookService.getAllBooks();
            const response = {
                status: "success",
                data: {
                    books: allBooks.map(book => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                },
            };

            return h.response(response).code(200);
        } catch (error) {
            return h.response({ status: "fail", message: error.message }).code(500);
        }
    }

    async getBookById(request, h) {
        try {
            const bookById = await this.bookService.getBookById({bookId: request.params.bookId});

            return h.response({
                status: "success",
                data: {
                    book: bookById,
                },
            }).code(200);
        } catch (error) {
            return h.response({status: "fail", message: error.message}).code(404)
        }
    }

    async updateBook(request, h) {
        try {
            const updatedBook = await this.bookService.updateBook({bookId: request.params.bookId})

            return h.response({
                status: "success",
                message: "Buku berhasil diperbarui"
            }).code(200);
        } catch (error) {
            return h.response({status: "fail", message: error.message}).code(400);
        }
    }
}