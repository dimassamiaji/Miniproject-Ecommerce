/*
  Warnings:

  - You are about to drop the column `eventDate` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `eventDate`,
    ADD COLUMN `Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
