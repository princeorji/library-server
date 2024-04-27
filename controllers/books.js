const bookService = require("../services/bookService");

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

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
