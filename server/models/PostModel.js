const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "The user who made this post is required."],
  },
  prompt: {
    type: String,
    required: [true, "The prompt for the post is required."],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

postSchema.pre("save", async function () {
    // Call the image generation model here?
});

module.exports = mongoose.model("Post", postSchema);
