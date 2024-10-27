import express from "express";
import { addBook, deleteBook, getAllBooks, issueBook, returnBook, updateBook } from "../controllers/bookController.js";

const router = express.Router();

// Route to add a new book
router.post("/add", addBook);
router.get("/all/:_id", getAllBooks);
router.put('/update/:bookId', updateBook);
router.delete('/delete/:bookId', deleteBook);
// Route to issue a book
router.post("/issue", issueBook);

// Route to return a book
router.post("/return", returnBook);

export default router;
