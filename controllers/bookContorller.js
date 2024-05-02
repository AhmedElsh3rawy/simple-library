import pool from "../database/db.js";
import { get_books, get_book_by_id } from "../database/bookQueries.js";

export const getBooks = async (req, res) => {
  pool.query(get_books, async (error, results) => {
    if (error) throw error;
    await res.status(200).json(results.rows);
  });
};

export const getBookById = async (req, res) => {
  const id = parseInt(req.params.bookId);
  pool.query(get_book_by_id, [id], async (error, results) => {
    if (error) throw error;
    await res.status(200).json(results.rows);
  });
};
