/*
  Warnings:

  - You are about to drop the column `price` on the `tbl_medicine` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `tbl_medicine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tbl_medicine` DROP COLUMN `price`,
    DROP COLUMN `stock`;
