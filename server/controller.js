require('dotenv').config()

const {CONNECTION_STRING} = process.env
const res = require('express/lib/response')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {

    createUser: (req, res1) => {
        const {name, username, email, password} = req.body
        sequelize.query(`INSERT INTO users(name, username, email, password)
        VALUES ('${name}', '${username}', '${email}', '${password}');`)
        .then(res1 => res.status(200).send('Success!'))
        .catch(err => console.log(err))
    },

    userLogin: (req, res) => {
       const {loginEmail, loginPass} = req.body
       sequelize.query(`SELECT * FROM users
       WHERE email = '${loginEmail}' AND password = '${loginPass}';`)
       .then(dbRes => {
            console.log(dbRes[0][0]); 
       })
       .catch(err => console.log(err))
    }
}