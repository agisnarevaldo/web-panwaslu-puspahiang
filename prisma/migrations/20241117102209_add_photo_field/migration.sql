/*
  Warnings:

  - You are about to alter the column `TanggaLahir` on the `pptps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `anggota` ADD COLUMN `photo` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `pptps` MODIFY `TanggaLahir` DATETIME NULL;
