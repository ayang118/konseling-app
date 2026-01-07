import jwt from "jsonwebtoken";

/**
 * Middleware untuk verifikasi JWT
 * Header wajib: Authorization: Bearer <token>
 */
export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token tidak ditemukan / format salah" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // simpan info user dari token untuk dipakai controller
    req.user = decoded; // { id, role, iat, exp }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid / kadaluarsa" });
  }
};

/**
 * Middleware pembatas role
 * contoh: authorize("admin") atau authorize("admin","siswa")
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: akses ditolak" });
    }

    next();
  };
};
