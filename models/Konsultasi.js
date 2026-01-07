import db from "../config/db.js";

export const Konsultasi = {
  create: (id_user, gejala_json, hasil_diagnosis, callback) =>
    db.query(
      "INSERT INTO konsultasi (id_user, gejala_json, hasil_diagnosis) VALUES (?, ?, ?)",
      [id_user, JSON.stringify(gejala_json), hasil_diagnosis],
      callback
    ),

  findByUser: (id_user, callback) =>
    db.query(
      "SELECT * FROM konsultasi WHERE id_user = ? ORDER BY tanggal DESC",
      [id_user],
      callback
    ),
};
