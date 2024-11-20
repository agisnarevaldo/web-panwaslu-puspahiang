/*
  Warnings:

  - You are about to alter the column `TanggaLahir` on the `pptps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `pptps` MODIFY `TanggaLahir` DATETIME NULL;

-- CreateTable
CREATE TABLE `anggota` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `jabatan` VARCHAR(255) NOT NULL,
    `periode` VARCHAR(255) NOT NULL,
    `alamat` TEXT NOT NULL,
    `noTelp` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `divisi` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,

    UNIQUE INDEX `anggota_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
