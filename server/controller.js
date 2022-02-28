require("dotenv").config();

const { DATABASE_URL } = process.env;
const res = require("express/lib/response");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  createUser: (req, res) => {
    const { name, username, email, password } = req.body;
    sequelize.query(`INSERT INTO users(name, username, email, password)
        VALUES ('${name}', '${username}', '${email}', '${password}');`);

    res.status(200).send("user created");
  },

  userLogin: (req, res) => {
    const { loginEmail, loginPass } = req.body;
    sequelize
      .query(
        `SELECT * FROM users
       WHERE email = '${loginEmail}'`
      )
      .then((dbRes) => {
        const results = dbRes[0][0];
        if (results) {
          if (results.password === loginPass) {
            res.status(200).send(results);
            console.log("We found the user");
          }
          if (results.password !== loginPass) {
            res.status(401).send("Pass does not match");
          }
        } else {
          res.status(404).send("We couldnt find the user");
        }
      })
      .catch((err) => console.log("We could not find the user", err));
  },

  createTrip: (req, res) => {
    const { userId, city, weight, ticketQty, dateSlct } = req.body;

    sequelize.query(`INSERT INTO trips(user_id, city, date, weight, qty)
        VALUES ('${userId}', '${city}', '${dateSlct}', '${weight}', '${ticketQty}');`);

    res.status(200).send("Trip Created!");
  },

  getTrips: (req, res) => {
    const { userId } = req.body;
    sequelize
      .query(`SELECT * FROM trips WHERE '${userId}' = user_id;`)
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      });
  },

  deleteTrip: (req, res) => {
    // console.log(req.body.item);
    sequelize
      .query(`DELETE FROM trips WHERE '${req.body.item}' = id;`)
      .then((dbRes) => {
        res.status(200).send(true);
      });
  },
};
