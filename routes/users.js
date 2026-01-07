import express from "express";
import db from "../config/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

/* ===============================
   GET SEMUA SISWA
================================ */
router.get("/", (req, res) => {
  db.query(
    "SELECT id, nama, username, role FROM users WHERE role='siswa'",
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

/* ===============================
   TAMBAH SISWA
================================ */
router.post("/", async (req, res) => {
  const { nama, username, password } = req.body;

  if (!nama || !username || !password) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (nama, username, password, role) VALUES (?, ?, ?, 'siswa')",
    [nama, username, hash],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Gagal tambah siswa" });
      }
      res.json({ message: "Siswa berhasil ditambahkan" });
    }
  );
});

/* ===============================
   UPDATE DATA SISWA
================================ */
router.put("/:id", async (req, res) => {
  const { nama, username, password } = req.body;
  const { id } = req.params;

  let sql = "UPDATE users SET nama=?, username=?";
  let params = [nama, username];

  if (password) {
    const hash = await bcrypt.hash(password, 10);
    sql += ", password=?";
    params.push(hash);
  }

  sql += " WHERE id=? AND role='siswa'";
  params.push(id);

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result.affectedRows)
      return res.status(404).json({ message: "Siswa tidak ditemukan" });

    res.json({ message: "Data siswa diperbarui" });
  });
});

/* ===============================
   DELETE SISWA
================================ */
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM users WHERE id=? AND role='siswa'",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result.affectedRows)
        return res.status(404).json({ message: "Siswa tidak ditemukan" });

      res.json({ message: "Siswa berhasil dihapus" });
    }
  );
});

export default router;
