const User = require("../models/User")
const Follow = require("../models/Follow");
const bcrypt = require("bcrypt")
const jwt = require('../services/jwt');
const fs = require('fs')
const path = require('path')
const followService = require("../services/followUserIds");
const Publication = require("../models/Publication");

const testUser = (req, res) => {
  // Function code goes here
  return res.status(200).json(
    {
      message: "Test message  User controller",
      user: req.user
    }
  )

};

const register = async (req, res) => {
  // Function code goes here

  const params = req.body
  console.log("Params", params)

  if (params.name && params.password && params.email && params.nick) {

    console.log("minium passed validation")

    try {
      await User.find({
        "$or": [
          { "email": params.email.toLowerCase() },
          { "nick": params.nick.toLowerCase() }

        ]
      }).exec().then(async (value) => {

        // ----------------------------------------------
        // NOTE: conditional users exist
        // ----------------------------------------------

        console.log(value)
        if (value.length >= 1) {

          return res.status(500).json(
            {
              status: "error",
              message: "User exist, change the username"
            }
          )
        }

        const pwd = await bcrypt.hash(params.password, 10)

        console.log(pwd)
        params.password = pwd


        let userToSave = new User(params)

        await userToSave.save()

        return res.status(200).json(

          {
            status: "success",
            message: "User registered controller",
            userToSave
          }
        )
      }
      )
    }
    catch (error) {

      return res.status(500).json(

        {
          status: "error user request",
          message: error
        }
      )


    }

  } else {

    return res.status(500).json(

      {
        status: "error user request",
        message: "error"
      }
    )


  }

};

const login = async (req, res) => {
  // Function code goes here

  const params = req.body

  if (!params.email || !params.password) {

    return res.status(500).json(

      {
        status: "error user request without",
        message: "error"
      }
    )
  }

  try {
    await User.findOne({ email: params.email }).exec().then((user) => {

      if (!user) {
        return res.status(500).json(

          {
            status: "error",
            message: "error data",
            user
          }
        )
      }
      else {

        let pwd = bcrypt.compareSync(params.password, user.password)

        if (!pwd) {
          return res.status(500).json(

            {
              status: "error",
              message: "Incorrect data",
            }
          )
        }

        const token = jwt.createToken(user)

        return res.status(200).json(

          {
            status: "success",
            message: "login action",
            user: {
              id: user._id,
              name: user.name,
              nick: user.nick
            },
            token
          }
        )
      }
    }
      // User found
    )
  }
  catch (error) {

    return res.status(500).json(

      {
        status: "error user request",
        message: "error"
      }
    )
  }


};

const profile = async (req, res) => {

  // Function code goes here
  const id = req.params.id
  console.log(id)

  try {
    await User.findById(id).select({ password: 0, role: 0 }).exec().then(async (user, err) => {
      console.log(user)

      if (err || !user) {
        return res.status(404).json(
          {
            status: "user not exist",
            message: err
          }
        )
      }

      // INFO FOLLOWING
      const followInfo = await followService.followThisUser(req.user.id, id)

      return res.status(200).json(
        {
          status: "success",
          message: "profile ready",
          userData: req.user,
          following: followInfo.follow,
          followers: followInfo.followers,
        }
      )
    })
    // Code that may throw an error

  } catch (error) {
    // Code to handle the error

    return res.status(500).json(

      {
        status: "error user request",
        message: error
      }
    )
  }

};

const list = async (req, res) => {

  // CONTROL PAGE 
  let page = 1

  if (req.params.page) {
    page = req.params.page
  }

  page = parseInt(page)

  // REQUEST MONGOOSE PAGINATE

  let itemsPerPage = 2;


  try {

    const options = {
      page: page,
      limit: itemsPerPage,
      populate: { path: "user", select: "-password -role -__v -email" },
      sort: "_id"
    }

    await User.paginate({}, options, async (err, data) => {

      if (err || !data) {
        return res.status(500).json(
          {
            status: "error",
            message: "No users"
          }
        )
      }

      console.log(req.user)
      let followUser = await followService.followUserIds(req.user.id)

      //RETURN RESULT
      return res.status(200).json(
        {
          status: "success",
          message: "list ready",
          data,
          user_following: followUser.following,
          user_follow_me: followUser.followers
          // total: users.length,
          // pages: Math.ceil(total / itemsPerPage)
        }
      )
    }
    )

  } catch (error) {
    // Code to handle the error

    if (error) {
      return res.status(500).json(
        {
          status: "error pagination",
          error: error

        }
      )
    }
  }
};

const update = async (req, res) => {
  // Function code goes here

  let userIdentity = req.user
  let userToUpdate = req.body

  delete userToUpdate.iat
  delete userToUpdate.exp
  delete userToUpdate.role
  delete userToUpdate.image

  try {
    await User.find({
      "$or": [
        { "email": userToUpdate.email.toLowerCase() },
        { "nick": userToUpdate.nick.toLowerCase() }

      ]
    }).exec().then(async (value) => {

      // ---------------------------------------------------
      // NOTE: conditional users exist
      // ---------------------------------------------------

      let userIsset = false
      console.log('or-email-nick', value)

      value.forEach(user => {
        // console.log('userId', user._id)
        // console.log('identity', userIdentity.id)

        if (user && user._id != userIdentity.id) { userIsset = true }
      })

      if (userIsset) {
        return res.status(500).json(
          {
            status: "error",
            message: "User exist, change data"
          }
        )
      }

      if (userToUpdate.password) {
        let pwd = await bcrypt.hash(userToUpdate.password, 10)
        userToUpdate.password = pwd
      }
      else {
        delete userToUpdate.password
      }

      try {

        const userUpdate = await User.findByIdAndUpdate({ _id: userIdentity.id }, userToUpdate, { new: true })

        if (userUpdate) {

          return res.status(200).json(
            {
              status: "success",
              message: "User registered controller",
              userToUpdate
            }
          )
        }

      }
      catch (error) {

        return res.status(500).json(
          {
            status: "error",
            message: "error updating profile"
          }
        )
      }

    }
    )
  }
  catch (error) {

    return res.status(500).json(
      {
        status: "error user request",
        message: error
      }
    )
  }
};

const upload = async (req, res) => {
  // Function code goes here
  {
    // console.log(req.file)
    // Function code goes here
    console.log(req.file)

    if (!req.file && !req.files) {
      return res.status(404).json(
        {
          status: "error",
          message: "Invalidated request"
        }
      )
    }

    let file = req.file.originalname;


    let splitFile = file.split("\.")
    let extension = splitFile[1]

    console.log(splitFile)

    if (extension !== "jpeg" && extension !== "bmp" && extension !== "png" && extension !== "gif" && extension !== "jpg") {

      fs.unlink(req.file.path, (error) => {
        return res.status(400).json(
          {
            status: error,
            message: "Invalidated image"
          }
        )
      })
    }
    else {

      try {
        // Code that may throw an error
        const userUpdate = await User.findOneAndUpdate({ _id: req.user.id }, { image: req.file.filename }, { new: true })

        return res.status(200).json(
          {
            status: "success",
            message: userUpdate
          }
        )
      } catch (error) {
        // Code to handle the error
        return res.status(500).json(
          {
            status: "error",
            message: "Error uploading avatar"
          }
        )
      }
    }
  }
};

const avatar = (req, res) => {
  // Function code goes here

  const file = req.params.file

  const filePath = './upload/avatars/' + file


  console.log(filePath)
  fs.stat(filePath, (error, exists) => {

    if (!exists) { return res.status(404).send({ status: "error", message: error }) }

    return res.sendFile(path.resolve(filePath))

  })
};

const counters = async (req, res) => {
  // Function code goes here

  let userId = req.user.id

  if (req.params.id) {
    userId = req.params.id
  }

  try {

    const following = await Follow.count({ user: userId })
    const followed = await Follow.count({ following: userId })
    const publications = await Publication.count({ user: userId })

    return res.status(200).json(
      {
        status: "success",
        userId,
        following: following,
        followed: followed,
        publications: publications,
      }
    )
  } catch (error) {
    // Code to handle the error
    // Code to handle the error
    return res.status(500).json(
      {
        status: "error",
        message: "Error counters requests"
      }
    )
  }

};

module.exports = { testUser, register, login, profile, list, update, upload, avatar, counters }