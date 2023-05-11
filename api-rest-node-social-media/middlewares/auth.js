const jwt = require("jwt-simple")
const moment = require('moment')
const libjwt = require('../services/jwt')
const secret = libjwt.secret

// MIDDLEWARE

exports.auth = (req, res, next) => {

  // console.log(req.headers.authorization)

  if (!req.headers.authorization) {
    return res.status(403).send(
      {
        status: "error",
        message: "No authentication headers"
      }
    )
  }

  let token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    // ------------------------------------------------------
    // IMPORTANT : IF EXIST ERROR IN DECODING FAILS TOKEN
    // ------------------------------------------------------

    let payLoad = jwt.decode(token, secret)

    if (payLoad.exp <= moment().unix()) {

      return res.status(401).send(
        {
          status: "error",
          message: "Expired Token"
        }
      )
    }

    req.user = payLoad;

  } catch (error) {
    // Code to handle the error
    if (req.headers.authorization) {
      return res.status(404).send(
        {
          status: "error",
          message: "Invalid Token",
          error
        }
      )
    }
  }
  next()

}
