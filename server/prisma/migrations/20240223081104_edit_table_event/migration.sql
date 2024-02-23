/*
  Warnings:

  - You are about to drop the column `Date` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `isFree` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `Date`,
    DROP COLUMN `isFree`,
    ADD COLUMN `eventDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
