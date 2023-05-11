
const { Schema, model } = require("mongoose")
//model structure
const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true

    },
    surname: {
      type: String

    },
    nick: {
      type: String

    },
    password: {

      type: String,
      required: true
    }
    ,
    bio: String
    ,
    email: {
      type: String,
      required: true

    },
    role: {
      type: String,
      default: "role_user"

    },

    image: {
      type: String,
      default: "default.png"

    }
    ,
    create_at: {
      type: Date,
      default: Date.now
    }
  }
)
// UserSchema.plugin(mongoosePagination)

module.exports = model("User", UserSchema, "users")