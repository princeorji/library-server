const userPath = require("../db/users.json");
const { writeData } = require("../utils/fileHelper");

let nextId = userPath.length + 1;

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(userPath);
  });
}

function create(user) {
  return new Promise((resolve, reject) => {
    const newUser = { id: nextId++, ...user };
    userPath.push(newUser);
    writeData("./db/users.json", userPath);
    resolve(newUser);
  });
}

function authenticate(credentials) {
  return new Promise((resolve, reject) => {
    const { username, password } = credentials;
    const user = userPath.find(
      (user) => user.username === username && user.password === password
    );
    resolve(user !== undefined);
  });
}

module.exports = {
  findAll,
  create,
  authenticate,
};
