/*
  Warnings:

  - You are about to alter the column `TanggaLahir` on the `pptps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `lampiran` to the `pengumuman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pengumuman` ADD COLUMN `lampiran` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `pptps` MODIFY `TanggaLahir` DATETIME NULL;
