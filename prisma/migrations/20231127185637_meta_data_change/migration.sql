/*
  Warnings:

  - You are about to drop the column `subTopic` on the `MetaData` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `MetaData` table. All the data in the column will be lost.
  - Added the required column `classfication` to the `MetaData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MetaData` DROP COLUMN `subTopic`,
    DROP COLUMN `topic`,
    ADD COLUMN `classfication` VARCHAR(100) NOT NULL;
