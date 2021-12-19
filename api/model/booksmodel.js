const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
  },
  { collection: "Books" }
);

module.exports = mongoose.model("Books", bookSchema);
