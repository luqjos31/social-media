const Follow = require("../models/Follow")
const User = require("../models/User")
const paginate = require("mongoose-pagination")
const { followUserIds, followThisUser } = require("../services/followUserIds")

const testFollow = (req, res) => {
  // Function code goes here
  return res.status(200).json(
    {
      message: "Test message follow controller"
    }
  )
};

const save = async (req, res) => {
  // Function code goes here

  const params = req.body
  const identity = req.user

  let userToFollow = new Follow({

    user: identity.id,
    following: params.following

  })

  try {

    const followingStore = await userToFollow.save()
    console.log(followingStore)
    // Code that may throw an error

    return res.status(200).json(
      {
        status: "success",
        identity: req.user,
        following: followingStore
      }
    )
  } catch (error) {

    return res.status(500).json(
      {
        status: "error saved",
        message: error
      }
    )
  }
};

const unfollow = async (req, res) => {

  // RECOGER EL ID DEL USUARIO IDENTIFICADO POR PARAMETRO
  const follow = req.params.id

  // RECOGER EL ID DEL USUARIO QUE SIGO Y QUIERO DEJAR DE SEGUIR

  console.log(req.user)

  try {

    // FOLLOW BY REQ.USER.ID
    await Follow.findOneAndRemove({
      user: req.user.id,
      following: follow
    })

    return res.status(200).json(
      {
        status: "success delete",
        dataFollow: follow
      }
    )
  }
  catch (error) {

    return res.status(500).json(
      {
        status: "Can t delete",
        message: error
      })
  }
};

const following = async (req, res) => {
  // Function code goes here

  let userId = req.params.id

  if (!userId) { userId = req.user.id }

  let page = req.params.page

  if (!page) { page = 1 }
  page = parseInt(page)

  // REQUEST MONGOOSE PAGINATE

  let itemsPerPage = 3;

  try {

    const options = {
      page: page,
      limit: itemsPerPage,
      populate: { path: "user following", select: "-password -role -__v -email" },
      sort: "-create_at"
    }

    await Follow.paginate({ user: userId }, options, async (err, data) => {

      if (err || !data) {
        return res.status(500).json(
          {
            status: "error",
            message: "Users have not been listed"
          }
        )
      }

      let followUser = await followUserIds(req.user.id)

      return res.status(200).json(
        {
          status: "success",
          message: "I am following ",
          data,
          user_following: followUser.following,
          user_follow_me: followUser.followers
        }
      )

    }
    )

  }
  catch (error) {

    return res.status(500).json(
      {
        status: "error",
        message: error
      }
    )
  }

};

const followers = async (req, res) => {
  // Function code goes here

  let userId = req.params.id

  if (!userId) { userId = req.user.id }

  let page = req.params.page

  if (!page) { page = 1 }

  page = parseInt(page)
  // REQUEST MONGOOSE PAGINATE

  let itemsPerPage = 2;

  try {

    const options = {
      page: page,
      limit: itemsPerPage,
      populate: { path: "user following", select: "-password -role -__v -email" },
      sort: "-create_at"
    }

    await Follow.paginate({ following: userId }, options, async (err, data) => {

      if (err || !data) {
        return res.status(500).json(
          {
            status: "error",
            message: "Publications have not been listed"
          }
        )
      }

      let followUser = await followUserIds(req.user.id)

      return res.status(200).json(
        {
          status: "success",
          message: "Users following me",
          followed: data,
          user_following: followUser.following,
          user_follow_me: followUser.followers
        }
      )
    }
    )

  }
  catch (error) {

    return res.status(500).json(
      {
        status: "error",
        message: error
      }
    )

  }
};

module.exports = { testFollow, save, unfollow, following, followers } 