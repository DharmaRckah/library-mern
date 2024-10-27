import bookModel from "../models/bookModel.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit per file
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|bmp|tiff|tif|webp|heic|heif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Error: Images Only!"));
    }
  },
}).array("img", 10); // 'img' corresponds to the field name in your form data, 10 is the max count

// Add a new book
export const addBook = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ error: "Multer error", message: err.message });
    } else if (err) {
      return res.status(500).send({ error: "Server error", message: err.message });
    }

    // Files uploaded successfully, proceed to create student payment
   
    const {userId ,price, title, category, author } = req.body;
    const img = req.files ? req.files.map((file) => file.path) : [];
    try {
     
      const newBook = new bookModel({admin:userId,price, title, category, author, img });
      await newBook.save();
      res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
      res.status(500).json({ message: "Error adding book", error });
    }
   
  });

};

// Update a book
export const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const { title, category, author, price } = req.body;
  let img = req.files ? req.files.map((file) => file.path) : [];
  try {
    // Find the book by ID
    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update fields if provided
    book.title = title || book.title;
    book.category = category || book.category;
    book.author = author || book.author;
    book.price = price || book.price;
    
    // If new images are uploaded, update them, otherwise keep existing images
    if (img.length > 0) {
      book.img = img;
    }

    // Save the updated book
    await book.save();

    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};
// Delete a book
export const deleteBook = async (req, res) => {
  const { bookId } = req.params;
console.log(bookId,"bookid")
  try {
    // Find and delete the book by ID
    const book = await bookModel.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};


export const getAllBooks = async (req, res) => {
    try {
      const {_id} =req.params
      const books = await bookModel.find({admin:_id})
      res.status(200).json({status:true,message:"Book found",books});
    } catch (error) {
      res.status(500).json({ message: "Error fetching books", error });
    }
  };

// Issue a book to a student
export const issueBook = async (req, res) => {
  const { bookId, studentId ,issueDate,returnDate,userName,contact} = req.body;
  try {
    const book = await bookModel.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.status === "Issued") return res.status(400).json({ message: "Book is already issued" });

    // Update the book's status and issuedTo field
    book.status = "Issued";
    book.issuedTo = studentId; 
    book.issueDate = issueDate; // Set issueDate from the request body
    book.returnDate = returnDate; // Ensure returnDate is null upon issuing
    book.userName=userName;
    book.contact=contact
    await book.save();

    res.status(200).json({ message: "Book issued successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error issuing book", error });
  }
};

// Return a book
export const returnBook = async (req, res) => {
  const { bookId } = req.body;
  try {
    const book = await bookModel.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.status === "Available") return res.status(400).json({ message: "Book is already available" });

    // Clear the issuedTo field and update the status
    book.issuedTo = null; 
    book.status = "Available"; 
    book.issueDate = null; 
    book.returnDate = null; 
    book.userName=null;
    book.contact=null
    await book.save();

    res.status(200).json({ message: "Book returned successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error });
  }
};
