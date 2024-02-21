/*
  Warnings:

  - You are about to drop the column `endDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    ADD COLUMN `Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
