CREATE DATABASE IF NOT EXISTS `konseling`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;
USE `konseling`;

SET FOREIGN_KEY_CHECKS=0;

-- ========================================================
-- USERS
-- ========================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','siswa') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB;

INSERT INTO `users` (`id`, `nama`, `username`, `password`, `role`) VALUES
(1, 'Admin', 'admin', '$2a$10$bGzQb3sD21MwxuOx4W95i.AMm193NL3yuX42AQBxwhe7QfRKbKrGm', 'admin'),
(2, 'Alifah Rafa Aulija Guswan', 'siswa1', '$2a$10$EBsy3PG3W164HeYlM/OabugyYgR.tZZUgL1HuxgxAbAiZRVBGzNNK', 'siswa'),
(3, 'Cantika Putri Athayaa Ranaa', 'siswa2', '$2a$10$EBsy3PG3W164HeYlM/OabugyYgR.tZZUgL1HuxgxAbAiZRVBGzNNK', 'siswa'),
(4, 'Sakirana Boru Mungkur', 'siswa3', '$2a$10$EBsy3PG3W164HeYlM/OabugyYgR.tZZUgL1HuxgxAbAiZRVBGzNNK', 'siswa'),
(5, 'Syahrin Henidar', 'siswa4', '$2a$10$EBsy3PG3W164HeYlM/OabugyYgR.tZZUgL1HuxgxAbAiZRVBGzNNK', 'siswa'),
(6, 'Jasmine Khavi Rafanissa', 'siswa5', '$2a$10$EBsy3PG3W164HeYlM/OabugyYgR.tZZUgL1HuxgxAbAiZRVBGzNNK', 'siswa'),
(9, 'Diva Amelia', 'siswa7', '$2b$10$FvxQBzbeHTAsAP1jZhEywO5M6Bhs6SaBK25tT3bn1WREKaxqL6u52', 'siswa');

-- ========================================================
-- DIAGNOSIS
-- ========================================================
CREATE TABLE IF NOT EXISTS `diagnosis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_diagnosis` varchar(255),
  `deskripsi` text,
  `tips` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `diagnosis` (`id`, `nama_diagnosis`, `deskripsi`, `tips`) VALUES
(2,'Stres Akademik','...','...'),
(3,'Kecemasan Akademik','...','...'),
(4,'Burnout (Kelelahan Belajar)','...','...'),
(5,'Depresi Ringan','...','...'),
(6,'Kecemasan Sosial','...','...'),
(7,'Kurang Motivasi Belajar','...','...'),
(8,'Masalah Manajemen Waktu','...','...'),
(9,'Overthinking dan Tekanan Diri','...','...');

-- ========================================================
-- GEJALA (LENGKAP)
-- ========================================================
CREATE TABLE IF NOT EXISTS `gejala` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_gejala` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `gejala` (`id`, `nama_gejala`) VALUES
(5, 'Sulit fokus belajar'),
(6, 'Sering cemas'),
(7, 'Nilai menurun'),
(8, 'Malas ke sekolah'),
(9, 'Sering menunda tugas'),
(10, 'Merasa tidak percaya diri'),
(11, 'Sering merasa lelah padahal tidak banyak aktivitas'),
(12, 'Mengalami gangguan tidur'),
(13, 'Tidak semangat saat pelajaran'),
(14, 'Sering merasa bersalah tanpa alasan'),
(15, 'Menghindari interaksi dengan teman'),
(16, 'Sering merasa tidak berguna'),
(17, 'Merasa panik saat ujian'),
(18, 'Sering overthinking tentang masa depan'),
(19, 'Sulit mengingat pelajaran'),
(20, 'Menangis tanpa sebab'),
(21, 'Lebih sering diam di kelas'),
(22, 'Tidak memiliki motivasi untuk belajar'),
(23, 'Sering lupa mengumpulkan tugas'),
(24, 'Sering absen tanpa alasan'),
(28, 'Sering Menangis tanpa sebab');

-- ========================================================
-- RULES
-- ========================================================
CREATE TABLE IF NOT EXISTS `rules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_diagnosis` int DEFAULT NULL,
  `gejala_json` text,
  PRIMARY KEY (`id`),
  KEY `id_diagnosis` (`id_diagnosis`),
  CONSTRAINT `rules_ibfk_1`
    FOREIGN KEY (`id_diagnosis`) REFERENCES `diagnosis` (`id`)
) ENGINE=InnoDB;

INSERT INTO `rules` (`id`, `id_diagnosis`, `gejala_json`) VALUES
(17,2,'["Sulit fokus belajar","Nilai menurun","Sering cemas"]'),
(18,3,'["Merasa panik saat ujian","Sering overthinking tentang masa depan","Sering cemas"]'),
(19,4,'["Sering merasa lelah padahal tidak banyak aktivitas","Tidak semangat saat pelajaran","Sering menunda tugas"]'),
(20,5,'["Menangis tanpa sebab","Merasa tidak berguna","Menghindari interaksi dengan teman"]'),
(21,6,'["Gugup saat berbicara di kelas","Menghindari interaksi dengan teman","Sering diam di kelas"]'),
(22,7,'["Tidak memiliki motivasi untuk belajar","Nilai menurun","Sering menunda tugas"]'),
(23,8,'["Sering lupa mengumpulkan tugas","Tidak bisa fokus belajar","Sering menunda tugas"]'),
(24,9,'["Sering overthinking tentang masa depan","Merasa tidak percaya diri","Sering merasa bersalah tanpa alasan"]');

-- ========================================================
-- KONSULTASI
-- ========================================================
CREATE TABLE IF NOT EXISTS `konsultasi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `gejala_json` text,
  `hasil_diagnosis` varchar(255),
  `tanggal` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `konsultasi_ibfk_1`
    FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB;

-- ========================================================
-- RIWAYAT KONSULTASI
-- ========================================================
CREATE TABLE IF NOT EXISTS `riwayat_konsultasi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_siswa` int NOT NULL,
  `nama_siswa` varchar(100),
  `diagnosis` varchar(100),
  `gejala_json` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `riwayat_konsultasi`
(`id`,`id_siswa`,`nama_siswa`,`diagnosis`,`gejala_json`,`created_at`) VALUES
(13,2,'Alifah Rafa Aulija Guswan','Overthinking dan Tekanan Diri',
'["Sering merasa lelah padahal tidak banyak aktivitas","Mengalami gangguan tidur","Sering merasa bersalah tanpa alasan"]','2025-12-21 02:54:03'),
(18,4,'Sakirana Boru Mungkur','Stres Akademik',
'["Sulit fokus belajar","Sering cemas","Nilai menurun"]','2025-12-21 03:30:02');

SET FOREIGN_KEY_CHECKS=1;
