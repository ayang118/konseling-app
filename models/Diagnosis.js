import db from "../config/db.js";

export const Diagnosis = {
  getAll: (callback) => db.query("SELECT * FROM diagnosis", callback),

  create: (nama_diagnosis, deskripsi, tips, callback) =>
    db.query(
      "INSERT INTO diagnosis (nama_diagnosis, deskripsi, tips) VALUES (?, ?, ?)",
      [nama_diagnosis, deskripsi, tips],
      callback
    ),

  update: (id, nama_diagnosis, deskripsi, tips, callback) =>
    db.query(
      "UPDATE diagnosis SET nama_diagnosis=?, deskripsi=?, tips=? WHERE id=?",
      [nama_diagnosis, deskripsi, tips, id],
      callback
    ),

  delete: (id, callback) =>
    db.query("DELETE FROM diagnosis WHERE id=?", [id], callback),
};
