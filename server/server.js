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
app.get("/bookings", (req, res) => {
  res.sendFile(path.join(__dirname, "../bookings.js"));
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
app.get("/ticket-select", (req, res) => {
  res.sendFile(path.join(__dirname, "../qty-select.js"));
});
app.get("/ticket-select", (req, res) => {
  res.sendFile(path.join(__dirname, "../qty-select.css"));
});
app.get("/city-select", (req, res) => {
  res.sendFile(path.join(__dirname, "../city-select.js"));
});
app.get("/city-select", (req, res) => {
  res.sendFile(path.join(__dirname, "../city-select.css"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/users", createUser);
app.post("/login", userLogin);
app.post("/trips", createTrip);
app.post("/getTrips", getTrips);
app.delete("/deleteTrip", deleteTrip);

app.listen(PORT, () => console.log(`up on ${PORT}`));
