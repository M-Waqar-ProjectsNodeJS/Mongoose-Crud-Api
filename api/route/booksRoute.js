const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const BookModel = require("../model/booksmodel");

const router = express.Router();
mongoose.connect("mongodb://localhost:27017/TestDb");
console.log("Database connected");

router.get("/api/books", async (req, res, next) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/api/books/:id", async (req, res, next) => {
  try {
    const book = await BookModel.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/api/books", async (req, res, next) => {
  try {
    const book = new BookModel({
      title: req.body.title,
      content: req.body.title,
      author: req.body.author,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/api/books", async (req, res, next) => {
  try {
    const book = await BookModel.findById(req.body.id);
    book.title = req.body.title;
    book.content = req.body.content;
    book.author = req.body.author;
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/api/books", async (req, res, next) => {
  try {
    await BookModel.deleteOne({ _id: req.body.id });
    res.status(200).json({
      message: "Deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
