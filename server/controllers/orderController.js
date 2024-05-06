import pool from "../database/db.js";
import { add_order, delete_order } from "../database/queries.js";

export const createOrder = async (req, res) => {
  const { customerId, bookId, quantity, city, street, shipDate } = req.body;
  if (!customerId || !bookId || !quantity || !city || !street || !shipDate) {
    return res.status(403).json({ massege: "Missing information" });
  }
  try {
    await pool.query(add_order, [
      customerId,
      bookId,
      quantity,
      city,
      street,
      shipDate,
    ]);
    res.send(201).json({ massege: "Created successfuly" });
  } catch (error) {
    console.error(error);
    res.send(500).json({ massege: error.massege });
  }
};
