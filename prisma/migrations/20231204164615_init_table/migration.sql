-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaData" (
    "id" SERIAL NOT NULL,
    "author" VARCHAR(100) NOT NULL,
    "classfication" VARCHAR(100) NOT NULL,
    "articleid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MetaData_articleid_key" ON "MetaData"("articleid");

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_articleid_fkey" FOREIGN KEY ("articleid") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
