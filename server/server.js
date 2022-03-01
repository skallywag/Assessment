require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const {
  createUser,
  userLogin,
  createTrip,
  getTrips,
  deleteTrip,
} = require("./controller.js");

app.use(express.json());
app.use(cors());

// let files = [
//   "/html/booking.html",
//   "/JS/script.js",
//   "/html/index.html",
//   "/JS/script.js",
//   "/JS/booking.js",
//   "/css/styles.css",
//   "/css/helper.css",
//   "/css/reset.css",
// ];

// app.get("/", function (req, res) {
//   console.log("hey im getting hit bro");
//   files.forEach((file) => res.sendFile(__dirname + "public" + file));
// });
app.get("/j", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
  res.sendFile(path.join(__dirname, "public/css/styles.css"));
  res.sendFile(path.join(__dirname, "public/css/helper.css"));
  res.sendFile(path.join(__dirname, "public/css/reset.css"));
  res.sendFile(path.join(__dirname, "public/JS/script.js"));
});

app.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "public/booking.html"));
  res.sendFile(path.join(__dirname, "public/JS/booking.js"));
});

app.post("/api/users", createUser);
app.post("/api/login", userLogin);
app.post("/api/trips", createTrip);
app.post("/api/getTrips", getTrips);
app.delete("/api/deleteTrip", deleteTrip);

app.listen(PORT, () => console.log(`up on ${PORT}`));
