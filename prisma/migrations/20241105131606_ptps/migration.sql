-- CreateTable
CREATE TABLE `pendaftar_ptps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaLengkap` VARCHAR(255) NOT NULL,
    `nik` VARCHAR(30) NOT NULL,
    `tempatLahir` VARCHAR(100) NULL,
    `TanggaLahir` DATETIME NULL,
    `jenisKelamin` VARCHAR(10) NULL,
    `alamat` TEXT NULL,
    `pendidikanTerakhir` VARCHAR(100) NULL,
    `noTelp` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `pekerjaan` VARCHAR(100) NULL,
    `suratPendaftaran` VARCHAR(255) NULL,
    `ktp` VARCHAR(255) NULL,
    `ijazah` VARCHAR(255) NULL,
    `daftarRiwayatHidup` VARCHAR(255) NULL,
    `suratPernyataan` VARCHAR(255) NULL,

    UNIQUE INDEX `pendaftar_ptps_nik_key`(`nik`),
    UNIQUE INDEX `pendaftar_ptps_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
