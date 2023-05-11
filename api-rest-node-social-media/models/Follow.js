const { Schema, model } = require("mongoose")
//model structure
const FollowSchema = Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    following: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    create_at: {
      type: Date,
      default: Date.now
    }
  }
)
// UserSchema.plugin(mongoosePagination)

module.exports = model("Follow", FollowSchema, "follows")