const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: [String],
      enum: [
        "Fiction",
        "Non-Fiction",
        "Business",
        "Mystery",
        "Thriller",
        "Science Fiction",
        "Fantasy",
        "Romance",
        "Historical",
        "Biography",
        "Self-help",
        "Autobiography",
        "Other",
      ],
    },
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "United States",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    summary: {
      type: String,
    },
    coverImageUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
