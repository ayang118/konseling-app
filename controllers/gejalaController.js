import db from "../config/db.js";

/**
 * GET semua gejala
 */
export const getGejala = (req, res) => {
  db.query("SELECT * FROM gejala", (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

/**
 * POST tambah gejala baru
 */
export const addGejala = (req, res) => {
  const { nama_gejala } = req.body;
  if (!nama_gejala)
    return res.status(400).json({ message: "Nama gejala wajib diisi" });

  db.query(
    "INSERT INTO gejala (nama_gejala) VALUES (?)",
    [nama_gejala],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Gejala berhasil ditambahkan", id: result.insertId });
    }
  );
};

/**
 * PUT edit gejala
 */
export const updateGejala = (req, res) => {
  const { id } = req.params;
  const { nama_gejala } = req.body;

  db.query(
    "UPDATE gejala SET nama_gejala=? WHERE id=?",
    [nama_gejala, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Gejala tidak ditemukan" });
      res.json({ message: "Gejala berhasil diperbarui" });
    }
  );
};

/**
 * DELETE hapus gejala
 */
export const deleteGejala = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM gejala WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Gejala tidak ditemukan" });
    res.json({ message: "Gejala berhasil dihapus" });
  });
};
