const userService = require("../services/userService");

const { getPostData } = require("../utils/fileHelper");

async function getAllUsers(req, res) {
  try {
    const users = await userService.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

async function createUser(req, res) {
  try {
    const body = await getPostData(req);

    const userData = JSON.parse(body);
    const newUser = await userService.create(userData);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

async function authenticateUser(req, res) {
  try {
    const body = await getPostData(req);
    const credentials = JSON.parse(body);
    const authenticated = await userService.authenticate(credentials);

    if (authenticated) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Authentication successful!" }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid username or password" }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  authenticateUser,
};
