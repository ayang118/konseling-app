import db from "../config/db.js";

/**
 * GET semua diagnosis
 */
export const getDiagnosis = (req, res) => {
  db.query("SELECT * FROM diagnosis", (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

/**
 * POST tambah diagnosis baru
 */
export const addDiagnosis = (req, res) => {
  const { nama_diagnosis, deskripsi, tips } = req.body;
  if (!nama_diagnosis)
    return res.status(400).json({ message: "Nama diagnosis wajib diisi" });

  db.query(
    "INSERT INTO diagnosis (nama_diagnosis, deskripsi, tips) VALUES (?, ?, ?)",
    [nama_diagnosis, deskripsi, tips],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Diagnosis berhasil ditambahkan", id: result.insertId });
    }
  );
};

/**
 * PUT edit diagnosis
 */
export const updateDiagnosis = (req, res) => {
  const { id } = req.params;
  const { nama_diagnosis, deskripsi, tips } = req.body;

  db.query(
    "UPDATE diagnosis SET nama_diagnosis=?, deskripsi=?, tips=? WHERE id=?",
    [nama_diagnosis, deskripsi, tips, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Diagnosis tidak ditemukan" });
      res.json({ message: "Diagnosis berhasil diperbarui" });
    }
  );
};

/**
 * DELETE diagnosis
 */
export const deleteDiagnosis = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM diagnosis WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Diagnosis tidak ditemukan" });
    res.json({ message: "Diagnosis berhasil dihapus" });
  });
};
