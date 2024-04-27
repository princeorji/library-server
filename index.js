const http = require("http");
const {
  getAllUsers,
  createUser,
  authenticateUser,
} = require("./controllers/users");
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  loanBook,
  returnBook,
} = require("./controllers/books");

const PORT = 4040;

function requestHandler(req, res) {
  if (req.url === "/users" && req.method === "GET") {
    getAllUsers(req, res);
  } else if (req.url === "/users" && req.method === "POST") {
    createUser(req, res);
  } else if (req.url === "/users/authenticate" && req.method === "POST") {
    authenticateUser(req, res);
  } else if (req.url === "/books" && req.method === "GET") {
    getAllBooks(req, res);
  } else if (req.url.match(/\/books\/([0-9]+)/) && req.method === "GET") {
    const id = parseInt(req.url.split("/")[2]);
    getBook(req, res, id);
  } else if (req.url === "/books" && req.method === "POST") {
    createBook(req, res);
  } else if (req.url.match(/\/books\/([0-9]+)/) && req.method === "PUT") {
    const id = parseInt(req.url.split("/")[2]);
    updateBook(req, res, id);
  } else if (req.url.match(/\/books\/([0-9]+)/) && req.method === "DELETE") {
    const id = parseInt(req.url.split("/")[2]);
    deleteBook(req, res, id);
  } else if (req.url === "/books/loan" && req.method === "PUT") {
    loanBook(req, res);
  } else if (req.url === "/books/return" && req.method === "POST") {
    returnBook(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
}

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
