const express = require("express")
const router = express.Router();
const { auth } = require("../middlewares/auth")
const FollowController = require("../controllers/follow")

router.get("/test-follow", FollowController.testFollow)
router.post("/save", auth, FollowController.save)
router.delete("/unfollow/:id", auth, FollowController.unfollow)
router.get("/following/:id?/:page?", auth, FollowController.following)
router.get("/followers/:id?/:page?", auth, FollowController.followers)

module.exports = router 