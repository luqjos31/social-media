const { Schema, model } = require("mongoose")
//model structure
const SchemaArticle = Schema(
  {
    title: {
      type: String,
      required: true

    },
    content: {
      type: String,
      required: true

    },
    date: {
      type: Date,
      default: Date.now

    },
    image: {
      type: String,
      default: "default.png"

    }
  }
)

module.exports = model("Article", SchemaArticle, "articles")