export const get_books = "SELECT * FROM Book";

export const get_book_by_id = "SELECT * FROM Book WHERE id = $1";

export const get_customer_by_email = "SELECT * FROM Customer WHERE email = $1";

export const get_customer_by_id = "SELECT * FROM Customer WHERE id = $1";

export const add_customer =
  "INSERT INTO Customer (name, email, password) VALUES ($1, $2, $3)";

export const get_orders = "SELECT * FROM Orders";

export const add_order =
  "INSERT INTO Orders (customer_id, book_id, quantity, city, street, ship_date) VALUES ($1, $2, $3, $4, $5, $6)";

export const delete_order = "DELETE FROM Orders WHERE id = $1";
