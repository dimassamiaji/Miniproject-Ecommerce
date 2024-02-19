/*
  Warnings:

  - You are about to drop the column `ticketTypes` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `promoType` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `discountCoupon` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `discountExpiry` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referralNumber` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referredBy` on the `user` table. All the data in the column will be lost.
  - Added the required column `discountCoupon` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `referralCode` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `ticketTypes`,
    ADD COLUMN `ticketType` ENUM('bronze', 'silver', 'gold') NULL;

-- AlterTable
ALTER TABLE `promotion` DROP COLUMN `promoType`,
    DROP COLUMN `value`,
    ADD COLUMN `discountCoupon` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `stock` MODIFY `stockstatus` ENUM('available', 'soldout') NULL;

-- AlterTable
ALTER TABLE `ticket` MODIFY `price` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `discountCoupon`,
    DROP COLUMN `discountExpiry`,
    DROP COLUMN `name`,
    DROP COLUMN `referralNumber`,
    DROP COLUMN `referredBy`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `referralCode` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('customer', 'organizer') NULL DEFAULT 'customer',
    MODIFY `gender` ENUM('male', 'female') NULL;
