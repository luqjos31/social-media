const express = require("express")
const multer = require("multer")
const router = express.Router();
const ArticleController = require("../controllers/article")

const storageFile = multer.diskStorage(
  {
    destination: function(req, file, cb) {

      cb(null, './images/articles/')
    },
    filename: function(req, file, cb) {
      cb(null, 'article' + Date.now() + file.originalname)
    }
  }
)
const uploads = multer({ storage: storageFile })

//test route
router.get("/test-route", ArticleController.test)
router.get("/course", ArticleController.course)
router.post("/create", ArticleController.create)
router.get("/articles/:last?", ArticleController.findArticle)
router.get("/article/:id", ArticleController.oneArticle)
router.delete("/article/:id", ArticleController.deleteId)
router.put("/article/:id", ArticleController.updateArticle)
router.post("/uploadimage/:id", [uploads.single("file0")], ArticleController.upload)
router.get("/image/:imagefile?", ArticleController.image)
router.get("/search/:word", ArticleController.search)

module.exports = router;
