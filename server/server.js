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
app.get("/ticket-select", (req, res) => {
  res.sendFile(path.join(__dirname, "../qty-select.css"));
});
app.get("/ticket-select", (req, res) => {
  res.sendFile(path.join(__dirname, "../qty-select.js"));
});
app.get("/city-select", (req, res) => {
  res.sendFile(path.join(__dirname, "../city-select.css"));
});
app.get("/city-select", (req, res) => {
  res.sendFile(path.join(__dirname, "../city-select.js"));
});
app.get(
  "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css",
  (req, res) => {
    res.sendFile(path.join(__dirname, "../city-select.css"));
  }
);
app.get(
  "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css",
  (req, res) => {
    res.sendFile(path.join(__dirname, "../city-select.css"));
  }
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/api/users", createUser);
app.post("/api/login", userLogin);
app.post("/api/trips", createTrip);
app.post("/api/getTrips", getTrips);
app.delete("/api/deleteTrip", deleteTrip);

app.listen(PORT, () => console.log(`up on ${PORT}`));
