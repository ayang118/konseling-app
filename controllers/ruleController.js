import db from "../config/db.js";

/* =========================
   GET semua rules
========================= */
export const getRules = (req, res) => {
  db.query(`
    SELECT 
      rules.id,
      rules.gejala_json,
      rules.id_diagnosis,
      diagnosis.nama_diagnosis
    FROM rules
    JOIN diagnosis ON rules.id_diagnosis = diagnosis.id
    ORDER BY rules.id DESC
  `, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

/* =========================
   GET rule by id
========================= */
export const getRuleById = (req, res) => {
  const { id } = req.params;

  db.query(`
    SELECT 
      rules.id,
      rules.id_diagnosis,
      rules.gejala_json,
      diagnosis.nama_diagnosis
    FROM rules
    JOIN diagnosis ON rules.id_diagnosis = diagnosis.id
    WHERE rules.id = ?
  `, [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Rule tidak ditemukan" });

    res.json(result[0]);
  });
};

/* =========================
   POST tambah rule (FIX)
========================= */
export const addRule = (req, res) => {
  let { id_diagnosis, gejala_json } = req.body;

  if (!id_diagnosis || !Array.isArray(gejala_json) || gejala_json.length === 0) {
    return res.status(400).json({
      message: "Diagnosis dan gejala wajib diisi"
    });
  }

  // 🔥 NORMALISASI GEJALA (WAJIB)
  const normalizedGejala = gejala_json.map(g =>
    g.toString().toLowerCase().trim()
  );

  db.query(
    "INSERT INTO rules (id_diagnosis, gejala_json) VALUES (?, ?)",
    [id_diagnosis, JSON.stringify(normalizedGejala)],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({
        message: "Rule berhasil ditambahkan",
        id: result.insertId
      });
    }
  );
};

/* =========================
   PUT edit rule (FIX)
========================= */
export const updateRule = (req, res) => {
  const { id } = req.params;
  let { id_diagnosis, gejala_json } = req.body;

  if (!id_diagnosis || !Array.isArray(gejala_json) || gejala_json.length === 0) {
    return res.status(400).json({
      message: "Diagnosis dan gejala wajib diisi"
    });
  }

  // 🔥 NORMALISASI GEJALA (WAJIB)
  const normalizedGejala = gejala_json.map(g =>
    g.toString().toLowerCase().trim()
  );

  db.query(
    "UPDATE rules SET id_diagnosis=?, gejala_json=? WHERE id=?",
    [id_diagnosis, JSON.stringify(normalizedGejala), id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Rule tidak ditemukan" });

      res.json({ message: "Rule berhasil diperbarui" });
    }
  );
};

/* =========================
   DELETE rule
========================= */
export const deleteRule = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM rules WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Rule tidak ditemukan" });

    res.json({ message: "Rule berhasil dihapus" });
  });
};
