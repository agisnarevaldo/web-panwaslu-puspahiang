/*
  Warnings:

  - You are about to drop the `Berita` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Berita`;

-- CreateTable
CREATE TABLE `berita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(255) NOT NULL,
    `isi` TEXT NOT NULL,
    `gambar` VARCHAR(255) NULL,
    `tglDibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `author` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `berita_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
