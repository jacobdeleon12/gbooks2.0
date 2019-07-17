import axios from "axios";
require("dotenv").config();

export default {
  // Gets all books
  searchBooks: function(bookTitle) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`);
  },
  // Gets the book with the given id
  getBooks: function() {
    return axios.get("/api/books/");
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
