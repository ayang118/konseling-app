import db from "../config/db.js";

export const Rule = {
  getAll: (callback) =>
    db.query(
      `SELECT rules.id, diagnosis.nama_diagnosis, rules.gejala_json 
       FROM rules JOIN diagnosis ON rules.id_diagnosis = diagnosis.id`,
      callback
    ),

  create: (id_diagnosis, gejala_json, callback) =>
    db.query(
      "INSERT INTO rules (id_diagnosis, gejala_json) VALUES (?, ?)",
      [id_diagnosis, JSON.stringify(gejala_json)],
      callback
    ),

  update: (id, id_diagnosis, gejala_json, callback) =>
    db.query(
      "UPDATE rules SET id_diagnosis=?, gejala_json=? WHERE id=?",
      [id_diagnosis, JSON.stringify(gejala_json), id],
      callback
    ),

  delete: (id, callback) =>
    db.query("DELETE FROM rules WHERE id=?", [id], callback),
};
