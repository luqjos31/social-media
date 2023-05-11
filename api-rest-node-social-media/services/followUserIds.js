const Follow = require("../models/Follow");

const followUserIds = async (userId) => {

  // Function code goes here
  try {
    let following = await Follow.find({ user: userId })
      // .populate("user")
      .select({ "following": 1, "_id": 0 })

    let followers = await Follow.find({ following: userId })
      // .populate("user")
      .select({ "user": 1, "_id": 0 })

    let followingClean = []
    following.forEach(follow => followingClean.push(follow.following))

    let followerClean = []
    followers.forEach(follow => followerClean.push(follow.user))

    return {
      following: followingClean,
      followers: followerClean
    }

  }
  catch (error) {
    console.error(error)
    return {}
  }

};

const followThisUser = async (IdentityUserId, profileUserId) => {

  // Function code goes here
  try {

    let follow = await Follow.findOne(
      {
        user: IdentityUserId,
        following: profileUserId
      })
    // .select({ "following": 1, "_id": 0 })


    let followers = await Follow.findOne({

      user: profileUserId,
      following: IdentityUserId

    })
    // .select({ "user": 1, "_id": 0 })

    // let followingClean = []
    // following.forEach(follow => followingClean.push(follow.following))

    // let followerClean = []
    // followers.forEach(follow => followerClean.push(follow.user))

    return {
      follow,
      followers
    }

  }
  catch (error) {
    console.error(error)
    return {}
  }

}
module.exports = { followUserIds, followThisUser }