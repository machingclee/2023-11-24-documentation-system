/*
  Warnings:

  - A unique constraint covering the columns `[articleid]` on the table `MetaData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `MetaData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MetaData` DROP FOREIGN KEY `MetaData_articleid_fkey`;

-- AlterTable
ALTER TABLE `MetaData` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MetaData_articleid_key` ON `MetaData`(`articleid`);
