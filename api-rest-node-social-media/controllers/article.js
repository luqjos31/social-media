const Article = require("../models/Articles")
const fs = require("fs")
const path = require("path")
const { validator } = require("../helpers/validator")

const test = (req, res) => {
  return res.status(200).json(
    {
      message: "Action controller test"
    }
  )
}

const course = (req, res) => {
  return res.status(200).send(
    [
      {
        Course: "Master in C#",
        autor: "Victor Robles",
        urls: "www.victoroblesweb.es/master-react"
      },
      {
        Course: "Master in VB",
        autor: "Victor Robles",
        urls: "www.victoroblesweb.es/master-react"
      }]
  )
}

const create = async (req, res) => {

  // Recollect param to save
  let params = req.body
  // Validate data
  // Code that may throw an error
  console.log(req.body)

  if (!validator(params)) {
    return res.status(400).json(
      {
        status: error,
        message: "Check your data"
      }
    )
  }

  //   // Code to handle the error
  // }

  // Create object to save
  const article = new Article(params);
  // Asign values to object based in model (manual o automatic)

  await article.save()
  // error => {

  // if (error || !savedArticle) {
  //   return res.status(400).json(
  //     {
  //       status: "error",
  //       message: "Few data"
  //     }
  //   )
  // }}
  // )

  return res.status(200).json(
    {
      status: "success",
      id: article._id,
      title: article.title,
      content: article.content,
      message: "Article saved"
    }
  )

}
// Return result

const findArticle = async (req, res) => {
  // const request = await Article.find({}).sort({ date: -1 }).limit(2)
  const request = await Article.find({}).sort({ date: -1 })
  return res.status(200).json(
    {
      status: "success",
      param: req.params.last,
      request
    }
  )
}

const oneArticle = async (req, res) => {
  // Function code goes here

  let idParam = req.params.id;
  if (!idParam) {

    return res.status(404).json(
      {
        status: "Error",
        Message: "Excuse me, I need article ID"
      }
    )
  }

  try {
    // Code that may throw an error

    const article = await Article.findById(idParam).exec();

    return res.status(200).json(
      {
        status: "success", article

      }
    )
  } catch (error) {
    // Code to handle the error

    return res.status(404).json(
      {
        status: "Error",
        Message: "Excuse me"
      }
    )
  }

}

const deleteId = async (req, res) => {
  // Function code goes here
  let idArticle = req.params.id;

  if (!idArticle) {

    return res.status(404).json(
      {
        status: "Error",
        Message: "Excuse me, I need article ID"
      }
    )
  }

  console.log(idArticle)

  try {
    // Code that may throw an error

    await Article.findOneAndDelete({ _id: idArticle }).exec()
    return res.status(200).json(
      {
        status: "success", id: idArticle
      }
    )

  } catch (error) {


    return res.status(404).json(
      {
        status: "Error",
        Message: "Excuse me, I need article ID"
      }
    )
    // Code to handle the error
  }
}



const updateArticle = async (req, res) => {
  // Function code goes here

  let idParam = req.params.id;
  if (!idParam) {

    return res.status(404).json(
      {
        status: "Error",
        Message: "Excuse me, I need article ID"
      }
    )
  }
  // Recollect param to save
  let params = req.body
  // Validate data
  try {

    validator(params)

  } catch (error) {
    // Code to handle the error
    return res.status(400).json(
      {
        status: "error",
        message: "Few data"
      }
    )
  }
  // Update data

  console.log(params)
  try {
    // Code that may throw an error
    await Article.findOneAndUpdate({ _id: idParam }, params, { new: true })

    return res.status(200).json(
      {
        status: "success", message: params
      }
    )

  } catch (error) {
    // Code to handle the error
    return res.status(400).json(
      {
        status: "error",
        message: "Few data"
      }
    )
  }
};

const upload = async (req, res) => {

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

    let idParam = req.params.id;
    if (!idParam) {

      return res.status(404).json(
        {
          status: "Error",
          Message: "Excuse me, I need article ID"
        }
      )
    }
    // Recollect param to save
    // let params = req.body
    // Validate data
    // try {

    //   validateArticle(params)

    // } catch (error) {
    //   // Code to handle the error
    //   return res.status(400).json(
    //     {
    //       status: "error",
    //       message: "Few data"
    //     }
    //   )
    // }
    // Update data

    try {
      // Code that may throw an error
      await Article.findOneAndUpdate({ _id: idParam }, { image: req.file.filename }, { new: true })

      return res.status(200).json(
        {
          status: "success", message: req.file
        }
      )

    } catch (error) {
      // Code to handle the error
      return res.status(400).json(
        {
          status: "error",
          message: "Few data"
        }
      )
    }

  }
};

const image = (req, res) => {
  // Function code goes here
  let imageFile = req.params.imagefile
  console.log(imageFile)
  let realPath = "./images/articles/" + imageFile

  fs.stat(realPath, (error, exist) => {
    if (exist) {
      return res.sendFile(path.resolve(realPath))
    } else {

      return res.status(400).json(
        {
          status: "error",
          message: "Image doesn't exist"
        }
      )
    }
  })
};

const search = async (req, res) => {
  // Function code goes here
  word = req.params.word

  try {
    // Code that may throw an error
    await Article.find({
      "$or": [
        { "title": { "$regex": word, "$options": "i" } },
        { "content": { "$regex": word, "$options": "i" } }]
    })
      .sort({ date: -1 })
      .exec().then((article) => {

        return res.status(200).json(
          {
            status: "success", message: article
          }
        )
      })
  } catch (error) {
    // Code to handle the error
    return res.status(400).json(
      {
        status: "error",
        message: "Word is not found"
      }
    )
  }
};

module.exports = {
  test, course, create, findArticle, oneArticle, deleteId, updateArticle, upload, image, search
}