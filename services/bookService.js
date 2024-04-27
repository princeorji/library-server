const bookPath = require("../db/books.json");
const { writeData } = require("../utils/fileHelper");

let nextId = bookPath.length + 1;

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(bookPath);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const book = bookPath.find((p) => p.id === parseInt(id));
    resolve(book);
  });
}

function create(book) {
  return new Promise((resolve, reject) => {
    const newBook = { id: nextId++, ...book };
    bookPath.push(newBook);
    writeData("./db/books.json", bookPath);
    resolve(newBook);
  });
}

function update(id, book) {
  return new Promise((resolve, reject) => {
    const index = bookPath.findIndex((p) => p.id === parseInt(id));
    bookPath[index] = { id, ...book };
    writeData("./db/books.json", bookPath);
    resolve(bookPath[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    books = bookPath.filter((p) => p.id === parseInt(id));
    writeData("./db/books.json", bookPath);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
