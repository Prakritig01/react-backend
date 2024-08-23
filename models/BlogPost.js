const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogpost = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogPostCollectionName = "ReactBackendBlogs";
const BlogPost = mongoose.model("BlogPost", blogpost, blogPostCollectionName);

module.exports = BlogPost;
