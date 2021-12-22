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

    createUser: (req, res) => {
        const {name, username, email, password} = req.body
        sequelize.query(`INSERT INTO users(name, username, email, password)
        VALUES ('${name}', '${username}', '${email}', '${password}');`)

        res.status(200).send('user created')
    },

    userLogin: (req, res) => {
       const {loginEmail, loginPass} = req.body
       // when we get the login - we want to check if it exists.
       sequelize.query(`SELECT * FROM users
       WHERE email = '${loginEmail}'`)
       .then(dbRes => {
           const results = dbRes[0][0]
            if(results){
                if(results.password === loginPass) {
                    res.status(200).send(results)
                    console.log('We found the user')
                        
                }else {
                    res.status(404)
                    console.log('Your password does not match.')
                }
                return
            }
            res.status(404)
            console.log('We couldnt find the user')
       })
       .catch(err => console.log('We could not find the user', err))
    }
}