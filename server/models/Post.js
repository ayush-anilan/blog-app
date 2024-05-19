const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

postSchema.methods.getThumbnailUrl = function () {
  if (this.thumbnail) {
    // Replace 'http://localhost:3000' with your actual server URL
    return `http://localhost:4000/${this.thumbnail}`;
  }
  return null;
};

module.exports = mongoose.model("Post", postSchema);
