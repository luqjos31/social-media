const Publication = require("../models/Publication");
const mongoosePaginate = require('mongoose-paginate-v2');
const Follow = require("../models/Follow")
const fs = require('fs')
const path = require('path');
const { followUserIds } = require("../services/followUserIds");

const testPublication = (req, res) => {
  // Function code goes here
  return res.status(200).json(

    {
      message: "Test message post controller"
    }
  )
};

// SAVE PUBLICATION

const save = async (req, res) => {

  let params = req.body

  if (!params.text) {

    return res.status(400).json(

      {
        status: "error",
        message: "You need send text",
        text: params.text
      }
    )
  }

  let newPublication = new Publication(params)
  newPublication.user = req.user.id

  try {

    await newPublication.save()
    // Code that may throw an error
    return res.status(200).json(

      {
        status: "success",
        message: "Test message post controller",
        text: params.text
      }
    )

  } catch (error) {

    return res.status(500).json(
      {
        status: "error",
        message: "error while saving publication",
        error: error
      }
    )
    // Code to handle the error
  }

};

// FIND PUBLICATION

const detail = async (req, res) => {

  const publicationId = req.params.id

  try {

    const publicationStored = await Publication.findById(publicationId).exec()

    return res.status(200).json(

      {
        status: "success",
        message: "show publication",
        publication: publicationStored
      }
    )

  } catch (error) {

    return res.status(404).json(

      {
        status: "error",
        message: "don't exist publication"
      }
    )

  }



};
// DELETE PUBLICATION

const deletePost = async (req, res) => {

  const publicationId = req.params.id

  // Code that may throw an error
  await Publication.findOneAndRemove({ "user": req.user.id, "_id": publicationId }).exec().then((data, err) => {

    if (!data || err) {

      return res.status(500).json(
        {
          status: "error",
          message: "Can't delete publication",
          err: err
        }
      )
    }

    // await Publication.findByIdAndDelete(publicationId)
    return res.status(200).json(
      {
        status: "success",
        message: "Delete message controller",
        dat: data
      }
    )
  }

  ).catch(error => {

    return res.status(500).json(
      {
        status: "error",
        message: "Can't delete publication",
        err: error
      }
    )


  })


  // Code to handle the error

};

// LIST PUBLICATION
const user = async (req, res) => {

  const userId = req.params.id

  // Control page
  let page = 1

  if (req.params.page) { page = req.params.page }

  const itemsPerPage = 3
  // find, populate, order, paginate

  try {

    const options = {
      page: page,
      limit: itemsPerPage,
      populate: { path: "user", select: "-password -role -__v -email" },
      sort: "-create_at"
    }

    await Publication.paginate({ user: userId }, options, (err, data) => {

      if (err || !data) {
        return res.status(500).json(
          {
            status: "error",
            message: "Publications have not been listed"
          }
        )
      }
      return res.status(200).json(
        {
          status: "success",
          message: "Posts user",
          user: req.user,
          data
        }
      )
    }
    )

    // Code that may throw an error
  } catch (error) {
    // Code to handle the error

    return res.status(400).json(
      {
        status: "error",
        message: "Error search publications",
        text: params.text
      }
    )
  }
};

// // LIST USER PUBLICATION
// const listUser = (req, res) => {

//   return res.status(200).json(

//     {
//       message: "Test message post controller"
//     }
//   )

// };

// UPLOAD FILES
const upload = async (req, res) => {

  const publicationId = req.params.id
  // Function code goes here
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
      const publicationUpdated = await Publication.findOneAndUpdate({ user: req.user.id, _id: publicationId }, { file: req.file.filename }, { new: true })

      return res.status(200).json(
        {
          status: "success",
          publication: publicationUpdated,
          file: req.file

        }
      )

    } catch (error) {
      // Code to handle the error
      return res.status(500).json(
        {
          status: "error",
          message: "Error uploading publication"
        }
      )
    }
  }
}

// RETURN MULTIMEDIA FILES
const media = (req, res) => {
  // Function code goes here

  const file = req.params.file
  const filePath = './upload/publications/' + file
  console.log(filePath)
  fs.stat(filePath, (error, exists) => {

    if (!exists) { return res.status(404).send({ status: "error", message: error }) }

    return res.sendFile(path.resolve(filePath))

  })
}

const feed = async (req, res) => {
  // Function code goes here

  let page = req.params.page

  if (!page) { page = 1 }

  const itemsPerPage = 3

  try {

    const myFollowers = await followUserIds(req.user.id)

    const options = {
      page: page,
      limit: itemsPerPage,
      populate: { path: "user", select: "-password -role -__v -email" },
      sort: "-create_at"
    }

    await Publication.paginate({ user: { $in: myFollowers.following } }, options, (err, data) => {

      if (err || !data) {
        return res.status(500).json(
          {
            status: "error",
            message: "Publications have not been listed"
          }
        )
      }
      return res.status(200).json(
        {
          status: "success",
          data
        }
      )
    }
    )

    // Other way

    // const followersPublications = await Publication.find({ "$in": myFollowers.following }).exec()


  } catch (error) {

    return res.status(500).json(
      {
        status: "error",
        message: "Users have not been listed"
      }
    )

  }



};


module.exports = { testPublication, save, detail, user, deletePost, upload, media, feed }; 