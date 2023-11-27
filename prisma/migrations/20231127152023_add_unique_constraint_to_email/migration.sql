/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Issue` MODIFY `email` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Issue_email_key` ON `Issue`(`email`);
