/*
  Warnings:

  - You are about to drop the column `email` on the `Article` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Article_id_email_author_classification_idx";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "email",
ADD COLUMN     "authorEmail" TEXT;

-- CreateIndex
CREATE INDEX "Article_id_authorEmail_author_classification_idx" ON "Article"("id", "authorEmail", "author", "classification");
