const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")
const UserSocial = require('../controllers/user')
const multer = require('multer')
const fs = require('fs')


const storageFile = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = './upload/avatars';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, 'avatar-' + Date.now() + '-' + file.originalname)
  }
})

const uploads = multer({ storage: storageFile })

router.get('/test-user', auth, UserSocial.testUser)
router.post('/register', UserSocial.register)
router.post('/login', UserSocial.login)
router.get('/profile/:id', auth, UserSocial.profile)
router.get('/list/:page?', auth, UserSocial.list)
router.put('/update', auth, UserSocial.update)
router.post('/upload', auth, [uploads.single("file0")], UserSocial.upload)
router.get('/avatar/:file', UserSocial.avatar)
router.get('/counters/:id', auth, UserSocial.counters)

module.exports = router;