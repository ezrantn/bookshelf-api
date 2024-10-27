import { nanoid } from "nanoid";

export class BookService {
  constructor() {
    this.books = [];
  }

  async addBook({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    if (!name) {
      throw new Error("Gagal menambahkan buku. Mohon isi nama buku");
    }

    if (readPage > pageCount) {
      throw new Error(
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      );
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
      updatedAt,
    };

    this.books.push(newBook);
    return newBook;
  }

  async getAllBooks() {
    return this.books;
  }

  async getBookById({ bookId }) {
    const book = this.findBookById(bookId);

    if (!book) {
      throw new Error("Buku tidak ditemukan");
    }

    return book;
  }

  async updateBook({
    bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    if (!name) {
      throw new Error("Gagal memperbarui buku. Mohon isi nama buku");
    }

    if (readPage > pageCount) {
      throw new Error(
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      );
    }

    const book = this.findBookById(bookId);

    if (!book) {
      const error = new Error("Gagal memperbarui buku. Id tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    book.name = name;
    book.year = year;
    book.author = author;
    book.summary = summary;
    book.publisher = publisher;
    book.pageCount = pageCount;
    book.readPage = readPage;
    book.reading = reading;

    return book;
  }

  async deleteBook({ bookId }) {
    const bookIndex = this.books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
      throw new Error("Buku gagal dihapus. Id tidak ditemukan");
    }

    return this.books.splice(bookIndex, 1);
  }

  findBookById(id) {
    return this.books.find((book) => book.id === id);
  }
}
