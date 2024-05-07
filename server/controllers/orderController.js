import pool from "../database/db.js";
import { get_orders, add_order, delete_order } from "../database/queries.js";

export const getOrders = async (req, res) => {
  const orders = await pool.query(get_orders);
  await res.json(orders);
};

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
    res.json({ massege: "Created successfuly" });
  } catch (error) {
    console.error(error);
    res.json({ massege: error.massege });
  }
};
