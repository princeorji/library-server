const bookService = require("../services/bookService");
const userService = require("../services/userService");

const { getPostData } = require("../utils/fileHelper");

async function getAllBooks(req, res) {
  try {
    const books = await bookService.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (error) {
    console.log(error);
  }
}

async function getBook(req, res, id) {
  try {
    const book = await bookService.findById(id);

    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(book));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createBook(req, res) {
  try {
    const body = await getPostData(req);

    const { title, author, year } = JSON.parse(body);

    const bookData = {
      title,
      author,
      year,
    };

    const newBook = await bookService.create(bookData);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newBook));
  } catch (error) {
    console.log(error);
  }
}

async function updateBook(req, res, id) {
  try {
    const book = await bookService.findById(id);

    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route Not Found" }));
    } else {
      const body = await getPostData(req);

      const { title, author, year } = JSON.parse(body);

      const bookData = {
        title: title || bookData.title,
        author: author || bookData.author,
        year: year || bookData.year,
      };

      const updatedBook = await bookService.update(id, bookData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedBook));
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteBook(req, res, id) {
  try {
    const book = await bookService.findById(id);

    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route Not Found" }));
    } else {
      await bookService.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Book "${id}" removed successfully` }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function loanBook(req, res) {
  try {
    const body = await getPostData(req);
    const { userId, bookId } = JSON.parse(body);

    const book = await bookService.findById(bookId);
    const user = await userService.findById(userId);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    }

    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    }

    if (book.loaned_to) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book is already loaned out" }));
    }

    book.loaned_to = userId;
    await bookService.update(bookId, book);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Book loaned out successfully" }));
  } catch (error) {
    console.log(error);
  }
}

async function returnBook(req, res) {
  try {
    const body = await getPostData(req);
    const { userId, bookId } = JSON.parse(body);

    const book = await bookService.findById(bookId);

    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    }

    if (book.loaned_to !== userId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book not loaned out to this user" }));
    }

    book.loaned_to = null;
    await bookService.update(bookId, book);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Book returned successfully" }));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  loanBook,
  returnBook,
};
