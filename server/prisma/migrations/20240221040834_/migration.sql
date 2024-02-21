/*
  Warnings:

  - You are about to drop the column `availableSeats` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `ticketType` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Referral` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToLocation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_EventToLocation` DROP FOREIGN KEY `_EventToLocation_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EventToLocation` DROP FOREIGN KEY `_EventToLocation_B_fkey`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `availableSeats`,
    DROP COLUMN `ticketType`,
    ADD COLUMN `location` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Location`;

-- DropTable
DROP TABLE `Referral`;

-- DropTable
DROP TABLE `_EventToLocation`;
