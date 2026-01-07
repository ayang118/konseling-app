import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// =========================
// REGISTER SISWA BARU
// =========================
export const register = async (req, res) => {
  const { nama, username, password } = req.body;

  if (!nama || !username || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  // cek apakah username sudah digunakan
  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length > 0) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (nama, username, password, role) VALUES (?, ?, ?, 'siswa')";
    db.query(sql, [nama, username, hashedPassword], (err2) => {
      if (err2) return res.status(500).json({ message: err2.message });
      res.status(201).json({ message: "Akun siswa berhasil dibuat" });
    });
  });
};

// =========================
// LOGIN
// =========================
export const login = (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username=?";
  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0) return res.status(401).json({ message: "User tidak ditemukan" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: { id: user.id, nama: user.nama, role: user.role }
    });
  });
};
