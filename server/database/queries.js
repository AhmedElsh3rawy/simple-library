export const get_books = "SELECT * FROM Book";

export const get_book_by_id = "SELECT * FROM Book WHERE id = $1";

export const get_customer_by_email = "SELECT * FROM Customer WHERE email = $1";

export const get_customer_by_id = "SELECT * FROM Customer WHERE id = $1";

export const add_customer =
  "INSERT INTO Customer (name, email, password) VALUES ($1, $2, $3)";

export const get_customer_by_email_and_password =
  "SELECT * FROM Customer WHERE email = $1 AND password = $2";

export const get_customer_password =
  "SELECT password from Customer WHERE email = $1";
