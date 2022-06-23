const dotenv = require('dotenv');
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const login = require("./controllers/login");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Success");
});

app.post("/login", (req, res) => {
  login.handleLogin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/image-url", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log(`App is running on port 3000`);
});