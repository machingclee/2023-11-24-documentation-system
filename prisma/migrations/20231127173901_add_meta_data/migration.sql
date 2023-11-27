/*
  Warnings:

  - You are about to drop the `Issue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Issue`;

-- CreateTable
CREATE TABLE `Artcile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` TEXT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetaData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author` TEXT NOT NULL,
    `topic` TEXT NOT NULL,
    `subTopic` TEXT NOT NULL,
    `articleid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MetaData` ADD CONSTRAINT `MetaData_articleid_fkey` FOREIGN KEY (`articleid`) REFERENCES `Artcile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
