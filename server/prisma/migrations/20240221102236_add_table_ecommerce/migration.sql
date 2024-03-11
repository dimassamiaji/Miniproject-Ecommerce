/*
  Warnings:

  - You are about to drop the column `availableSeats` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `ticketType` on the `event` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to drop the `_eventtolocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_eventtolocation` DROP FOREIGN KEY `_EventToLocation_A_fkey`;

-- DropForeignKey
ALTER TABLE `_eventtolocation` DROP FOREIGN KEY `_EventToLocation_B_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `availableSeats`,
    DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    DROP COLUMN `ticketType`,
    ADD COLUMN `Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `image_url` VARCHAR(255) NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `price` DECIMAL(18, 2) NOT NULL;

-- DropTable
DROP TABLE `_eventtolocation`;

-- DropTable
DROP TABLE `location`;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
