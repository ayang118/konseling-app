import db from "../config/db.js";

export const getPublicInfo = (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM users WHERE role='siswa') AS total_siswa,
      (SELECT COUNT(*) FROM konsultasi) AS total_konsultasi,
      (SELECT COUNT(*) FROM diagnosis) AS total_diagnosis
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({
      message: "Data publik berhasil diambil",
      data: result[0]
    });
  });
};
