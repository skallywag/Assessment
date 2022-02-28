require("dotenv").config();
const express = require("express");
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

app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/JS/script.js"));
});
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/JS/booking.js"));
});
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/main.js"));
});

app.post("/api/users", createUser);
app.post("/api/login", userLogin);
app.post("/api/trips", createTrip);
app.post("/api/getTrips", getTrips);
app.delete("/api/deleteTrip", deleteTrip);

app.listen(PORT, () => console.log(`up on ${PORT}`));
