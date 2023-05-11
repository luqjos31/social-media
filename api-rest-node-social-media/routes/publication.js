const express = require("express")
const router = express.Router()
const PublicationController = require('../controllers/publication')
const { auth } = require("../middlewares/auth")
const multer = require('multer')
const fs = require('fs')

const storageFile = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = './upload/publications';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, 'pub-' + Date.now() + '-' + file.originalname)
  }
})

const uploads = multer({ storage: storageFile })

router.get('/test-post', PublicationController.testPublication)
router.post("/save", auth, PublicationController.save)
router.get("/detail/:id", auth, PublicationController.detail)
router.delete("/remove/:id", auth, PublicationController.deletePost)
router.get("/user/:id/:page?", auth, PublicationController.user)
router.post("/upload/:id", [auth, uploads.single("file0")], PublicationController.upload)
router.post("/upload/:id", [auth, uploads.single("file0")], PublicationController.upload)
router.get('/media/:file', PublicationController.media)
router.get('/feed/:page?', auth, PublicationController.feed)

module.exports = router;