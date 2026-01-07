import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* ===============================
   SIMPAN RIWAYAT KONSULTASI
================================ */
router.post("/", (req, res) => {
  const { id_siswa, nama_siswa, diagnosis, gejala_json } = req.body;

  if (!id_siswa || !diagnosis || !gejala_json) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const sql = `
    INSERT INTO riwayat_konsultasi
    (id_siswa, nama_siswa, diagnosis, gejala_json)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [id_siswa, nama_siswa, diagnosis, JSON.stringify(gejala_json)],
    (err, result) => {
      if (err) {
        console.error("❌ ERROR SIMPAN RIWAYAT:", err);
        return res.status(500).json({ message: "Gagal simpan riwayat" });
      }

      res.status(201).json({
        message: "Riwayat konsultasi tersimpan",
        id: result.insertId
      });
    }
  );
});

/* ===============================
   GET RIWAYAT (ADMIN + FILTER BULAN)
================================ */
router.get("/", (req, res) => {
  const { bulan } = req.query; // YYYY-MM

  let sql = "SELECT * FROM riwayat_konsultasi";
  let params = [];

  if (bulan) {
    const [year, month] = bulan.split("-");
    sql += " WHERE YEAR(created_at) = ? AND MONTH(created_at) = ?";
    params.push(year, month);
  }

  sql += " ORDER BY created_at DESC";

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error("❌ ERROR GET RIWAYAT:", err);
      return res.status(500).json({ message: "Gagal ambil riwayat" });
    }
    res.json(rows);
  });
});

/* ===============================
   GET RIWAYAT PER SISWA
================================ */
router.get("/siswa/:id", (req, res) => {
  db.query(
    "SELECT * FROM riwayat_konsultasi WHERE id_siswa=? ORDER BY created_at DESC",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

/* ===============================
   UPDATE CATATAN ADMIN
================================ */
router.put("/:id", (req, res) => {
  const { catatan_admin } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE riwayat_konsultasi
    SET catatan_admin = ?
    WHERE id = ?
  `;

  db.query(sql, [catatan_admin, id], (err, result) => {
    if (err) {
      console.error("❌ ERROR UPDATE RIWAYAT:", err);
      return res.status(500).json({ message: "Gagal update riwayat" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Riwayat tidak ditemukan" });
    }

    res.json({ message: "Catatan admin berhasil diperbarui" });
  });
});

/* ===============================
   DELETE RIWAYAT
================================ */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM riwayat_konsultasi WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("❌ ERROR HAPUS RIWAYAT:", err);
        return res.status(500).json({ message: "Gagal hapus riwayat" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Riwayat tidak ditemukan" });
      }

      res.json({ message: "Riwayat berhasil dihapus" });
    }
  );
});

export default router;
