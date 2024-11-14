/*
  Warnings:

  - You are about to alter the column `TanggaLahir` on the `pptps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `pptps` ADD COLUMN `status` VARCHAR(20) NULL DEFAULT 'PENDING',
    MODIFY `TanggaLahir` DATETIME NULL;
