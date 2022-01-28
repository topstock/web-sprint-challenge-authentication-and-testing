const router = require('express').Router();
const User = require('./User-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { BCRYPT_ROUNDS, JWT_SECRET } = require("../secrets") // use this secret!

router.post('/register', async (req, res) => {
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }
    
    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
  const user = req.body
  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)
  const username = user.username

  if(!username || !user.password) {
    return res.status(400).json({ message: 'username and password required'})
  }
  const usernameUser = await User.findBy({username})
    try{
      if(usernameUser[0]) {
        return res.status(400).json({ message: 'username taken'})
      } 
    } catch (err){
      console.log(err)
    }
  user.password = hash
  const savedUser = await User.add(user)
    try {
      return res.status(201).json(savedUser)
    } catch (err) {
      return res.status(500).json({ message: err.message})
    }
});

router.post('/login', async (req, res) => {
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        message: "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
      let { username, password } = req.body
      
      if(!username || !password) {
        return res.status(400).json({ message: 'username and password required'})
      }

      const usernameUsers = await User.findBy({ username })
        try{
          if (usernameUsers[0] && bcrypt.compareSync(password, usernameUsers[0]["password"])) {
            const payload = {
              id: user.id,
              username: user.username,
            }
            const options = {
              expiresIn: '1d',
            }
            const token = jwt.sign(payload, JWT_SECRET, options)
            res.status(200).json({
              message: `welcome, ${user.username}`,
              "token": token
            })
          } else {
            res.status(401).json({ message: 'invalid credentials' })
          }
        } catch (err) {
          res.status(401).json({ message: 'invalid credentials' })
        }
});

module.exports = router;
