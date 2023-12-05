/*
  Warnings:

  - You are about to drop the `MetaData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MetaData" DROP CONSTRAINT "MetaData_articleid_fkey";

-- DropIndex
DROP INDEX "Article_id_email_idx";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "author" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "classification" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "MetaData";

-- CreateIndex
CREATE INDEX "Article_id_email_author_classification_idx" ON "Article"("id", "email", "author", "classification");
