import db from "../config/db.js";

export const konsultasiSiswa = (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { gejala_dipilih } = req.body;

  if (!Array.isArray(gejala_dipilih) || gejala_dipilih.length === 0) {
    return res.status(400).json({ message: "Gejala wajib dipilih" });
  }

  db.query("SELECT * FROM rules", (err, rules) => {
    if (err) return res.status(500).json({ message: err.message });

    let bestRule = null;
    let bestScore = 0;

    rules.forEach(rule => {
      let ruleGejala = [];

      try {
        ruleGejala = JSON.parse(rule.gejala_json || "[]");
      } catch {
        ruleGejala = [];
      }

      // 🔥 COCOKKAN BERDASARKAN TEKS (LABEL)
      const cocok = ruleGejala.filter(g =>
        gejala_dipilih.includes(g)
      ).length;

      const confidence =
        ruleGejala.length > 0 ? cocok / ruleGejala.length : 0;

      if (confidence > bestScore) {
        bestScore = confidence;
        bestRule = rule;
      }
    });

    if (!bestRule || bestScore === 0) {
      return res.json({
        hasil: {
          nama_diagnosis: "Belum dapat ditentukan",
          deskripsi: "Gejala belum cukup untuk menentukan diagnosis.",
          confidence: 0,
          tips: [
            "Pilih lebih banyak gejala",
            "Diskusikan dengan Guru BK"
          ]
        }
      });
    }

    db.query(
      "SELECT * FROM diagnosis WHERE id = ?",
      [bestRule.id_diagnosis],
      (err2, diag) => {
        if (err2 || diag.length === 0) {
          return res.json({
            hasil: {
              nama_diagnosis: "Diagnosis tidak tersedia",
              deskripsi: "Data diagnosis belum lengkap.",
              confidence: Math.round(bestScore * 100),
              tips: []
            }
          });
        }

        const d = diag[0];

        res.json({
          hasil: {
            nama_diagnosis: d.nama_diagnosis,
            deskripsi: d.deskripsi,
            confidence: Math.round(bestScore * 100),
            tips: d.tips ? d.tips.split(",") : []
          }
        });
      }
    );
  });
};
