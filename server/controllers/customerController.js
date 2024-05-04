import bcrypt from "bcrypt";
import pool from "../database/db.js";
import appError from "../utils/error.js";
import { ERROR, FAIL, SUCCESS } from "../utils/errorText.js";
import {
  get_customer_by_id,
  get_customer_by_email,
  add_customer,
  get_customer_by_email_and_password,
  get_password,
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
    await pool.query(add_customer, [name, email, hashedPassword]);
    res.status(201).json({ message: SUCCESS });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: FAIL });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const customer = await pool.query(get_customer_by_email, [email]);
  try {
    const isMatched = await bcrypt.compare(customer.password, password);

    if (isMatched) {
      res.json({ massege: "login successfully" });
    } else {
      res.status(401).json({ massege: "Invalid email or password" });
    }
  } catch {
    res.status(500).json({ message: ERROR });
  }
};
