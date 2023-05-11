const { Schema, model } = require("mongoose")
//model structure
const mongoosePaginate = require('mongoose-paginate-v2');
let PublicationSchema = Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User"
    },
    text: {
      type: String,
      required: true

    },
    file: {
      type: String

    },
    create_at: {
      type: Date,
      default: Date.now
    }
  }
)

PublicationSchema.plugin(mongoosePaginate)


// UserSchema.plugin(mongoosePagination)
module.exports = model("Publication", PublicationSchema, "publications")