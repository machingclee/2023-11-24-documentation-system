-- DropIndex
DROP INDEX "Article_id_idx";

-- CreateIndex
CREATE INDEX "Article_id_email_idx" ON "Article"("id", "email");
