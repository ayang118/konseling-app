import db from "../config/db.js";

export const User = {
  findAll: (callback) => {
    db.query("SELECT id, nama, username, role FROM users", callback);
  },

  findByUsername: (username, callback) => {
    db.query("SELECT * FROM users WHERE username = ?", [username], callback);
  },

  create: (nama, username, password, role, callback) => {
    db.query(
      "INSERT INTO users (nama, username, password, role) VALUES (?, ?, ?, ?)",
      [nama, username, password, role],
      callback
    );
  },
};
