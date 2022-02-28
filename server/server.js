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

// app.use("/js", express.static(path.join(__dirname, "client")));
// app.use("/js2", express.static(path.join(__dirname, "client/booking.js")));

// app.get("/client", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/html/index.html"));
// });
// app.get("/booking", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/html/booking.html"));
// });
// app.get("/js", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/JS/script.js"));
// });
// app.get("/js2", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/JS/booking.js"));
// });
// app.get("/css", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/css/styles.css"));
// });
// app.get("/css2", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/css/helper.css"));
// });
// app.get("/css3", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/css/reset.css"));
// });

app.post("/api/users", createUser);
app.post("/api/login", userLogin);
app.post("/api/trips", createTrip);
app.post("/api/getTrips", getTrips);
app.delete("/api/deleteTrip", deleteTrip);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../client")));

app.listen(PORT, () => console.log(`up on ${PORT}`));
