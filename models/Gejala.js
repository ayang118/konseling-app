import db from "../config/db.js";

export const Gejala = {
  getAll: (callback) => db.query("SELECT * FROM gejala", callback),

  create: (nama_gejala, callback) =>
    db.query("INSERT INTO gejala (nama_gejala) VALUES (?)", [nama_gejala], callback),

  update: (id, nama_gejala, callback) =>
    db.query("UPDATE gejala SET nama_gejala = ? WHERE id = ?", [nama_gejala, id], callback),

  delete: (id, callback) =>
    db.query("DELETE FROM gejala WHERE id = ?", [id], callback),
};
