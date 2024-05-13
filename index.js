const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Books = require("./models/book.models");

app.use(express.json());

initializeDatabase();

async function deleteBookById(bookId) {
  try {
    const deletedBook = await Books.findByIdAndDelete(bookId);
    return deletedBook;
  } catch (error) {
    throw error;
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deleteBook = await deleteBookById(req.params.bookId);
    if (deleteBook) {
      res.status(200).json({ message: "deleted successfully" });
    } else {
      res.status(404).json({ error: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function updateBookByTitle(bookTitle, dataToUpdate) {
  try {
    const updatedBookByTitle = await Books.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      { new: true },
    );
    return updatedBookByTitle;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.post("/books/:bookTitle", async (req, res) => {
  try {
    const book = await updateBookByTitle(req.params.bookTitle, req.body);
    if (book.length !== 0) {
      res
        .status(200)
        .json({ message: "updated book successfully", books: book });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

async function updateBookById(bookId, dataToUpdate) {
  try {
    const updatedBook = await Books.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updatedBook;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.post("/books/:bookId", async (req, res) => {
  try {
    const book = await updateBookById(req.params.bookId, req.body);
    if (book.length !== 0) {
      res
        .status(200)
        .json({ message: "book updated successfully", books: book });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function getBookByReleaseYear(bookReleaseYear) {
  try {
    const books = await Books.find({ publishedYear: bookReleaseYear });
    return books;
  } catch (error) {
    throw error;
  }
}

app.get("/books/publishedYear/:releaseYear", async (req, res) => {
  try {
    const book = await getBookByReleaseYear(req.params.releaseYear);
    if (book.length !== 0) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function getBookByGenre(bookGenre) {
  try {
    const bookByGenre = await Books.find({ genre: bookGenre });
    return bookByGenre;
  } catch (error) {
    throw error;
  }
}

app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const book = await getBookByGenre(req.params.bookGenre);
    if (book.length !== 0) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function getBookByAuthor(bookAuthor) {
  try {
    const bookByAuthor = await Books.findOne({ author: bookAuthor });
    return bookByAuthor;
  } catch (error) {
    throw error;
  }
}

app.get("/books/author/:bookAuthor", async (req, res) => {
  try {
    const book = await getBookByAuthor(req.params.bookAuthor);
    if (book.length !== 0) {
      res.status(200).json({ message: "book by author", books: book });
    } else {
      res.status(404).json({ error: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function getBookTitle(bookTitle) {
  try {
    const bookByTitle = await Books.findOne({ title: bookTitle });
    return bookByTitle;
  } catch (error) {
    throw error;
  }
}

app.get("/books/:bookTitle", async (req, res) => {
  try {
    const books = await getBookTitle(req.params.bookTitle);
    if (books.length !== 0) {
      res.status(200).json({ message: "books by titlt", book: books });
    } else {
      res.status(404).json({ error: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

async function getAllBook() {
  try {
    const allBooks = Books.find();
    return allBooks;
  } catch (error) {
    throw error;
  }
}

app.get("/books", async (req, res) => {
  try {
    const books = await getAllBook();
    if (books.length !== 0) {
      res
        .status(200)
        .json({ message: "fetched all books successfully", book: books });
    } else {
      res.status(404).json({ error: "books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch" });
  }
});

async function createBook(newBook) {
  try {
    const book = new Books(newBook);
    const saveBook = await book.save();
    return saveBook;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.post("/books", async (req, res) => {
  try {
    const book = await createBook(req.body);
    res
      .status(200)
      .json({ message: "New Book added successfully", newBook: book });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server connected to port ${PORT}`);
});
