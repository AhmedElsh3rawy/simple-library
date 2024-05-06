import bcrypt from "bcrypt";
import pool from "../database/db.js";
import appError from "../utils/error.js";
import { ERROR, FAIL, SUCCESS } from "../utils/errorText.js";
import {
  get_customer_by_id,
  get_customer_by_email,
  add_customer,
} from "../database/queries.js";

export const getCustomerById = async (req, res) => {
  const id = parseInt(req.params.customerId);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid customer ID." });
  }
  try {
    const results = await pool.query(get_customer_by_id, [id]);
    if (results.rows.length > 0) {
      res.status(200).json(results.rows[0]);
    } else {
      res.status(404).json({ message: "Customer not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the customer." });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  await pool.query(get_customer_by_email, [email], (error, results) => {
    if (results.rows.length) {
      res.status(500).json({ message: "Account already exist" });
    }
  });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(add_customer, [name, email, password]);
    res.status(201).json({ message: SUCCESS });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: FAIL });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "email and password are required" });
  }

  const customer = await pool.query(get_customer_by_email, [email]);
  try {
    const match = await bcrypt.compare(password, customer.password);
    if (match) {
      res.json({ massege: "Logged in successfully", status: 200 });
    } else {
      res.status(401).json({ massege: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.json({ massege: err.message });
  }
};
