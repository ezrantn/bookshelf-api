import { nanoid } from "nanoid";

export class BookService {
    constructor() {
        this.books = [];
    }

    async addBook({name, year, author, summary, publisher, pageCount, readPage, reading}) {
        if (!name) {
            throw new Error("Gagal menambahkan buku. Mohon isi nama buku");
        }

        if (readPage > pageCount) {
            throw new Error("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");
        }

        const id = nanoid();
        const finished = readPage >= pageCount;
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const yearNumber = Number(year);

        const newBook = {
            id,
            name,
            year: yearNumber,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt,
            updatedAt
          };

        this.books.push(newBook);
        return newBook;
    }

    async getAllBooks() {
        return this.books;
    }

    async getBookById({bookId}) {
        if (!bookId) {
            throw new Error("Buku tidak ditemukan");
        }

        return this.findBookById(bookId);
    }

    async updateBook({bookId}) {
        const request = {
            name, year, author, summary, publisher, pageCount, readPage, reading
        }

        if (!request.name) {
            throw new Error("Gagal memperbarui buku. Mohon isi nama buku");
        }

        if (request.readPage > request.pageCount) {
            throw new Error("Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount");
        }

        const book = this.findBookById(bookId);

        if (!book) {
            throw new Error("Gagal memperbarui buku. Id tidak ditemukan");
        }

        return book;
    }

    findBookById(id) {
        return this.books.find(book => book.id === id);
    }
}
