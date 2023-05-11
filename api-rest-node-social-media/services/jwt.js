const jwt = require("jwt-simple")
const moment = require('moment')

const secret = 'social-media-secret-password'

const createToken = (user) => {
  // Function code goes here
  const payLoad = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()

  }
  return jwt.encode(payLoad, secret)
};

module.exports = { createToken, secret }
