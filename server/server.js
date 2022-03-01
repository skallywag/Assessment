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

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "../booking.html"));
});
app.get("/script", (req, res) => {
  res.sendFile(path.join(__dirname, "../script.js"));
});
app.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "../booking.js"));
});
app.get("/styles", (req, res) => {
  res.sendFile(path.join(__dirname, "../styles.css"));
});
app.get("/helper", (req, res) => {
  res.sendFile(path.join(__dirname, "../helper.css"));
});
app.get("/reset", (req, res) => {
  res.sendFile(path.join(__dirname, "../reset.css"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/api/users", createUser);
app.post("/api/login", userLogin);
app.post("/api/trips", createTrip);
app.post("/api/getTrips", getTrips);
app.delete("/api/deleteTrip", deleteTrip);

app.listen(PORT, () => console.log(`up on ${PORT}`));
