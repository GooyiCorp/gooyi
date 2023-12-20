/*
  Warnings:

  - You are about to drop the column `category` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "category";

-- DropEnum
DROP TYPE "Category";

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "_StoreAndCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_StoreAndCategory_AB_unique" ON "_StoreAndCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreAndCategory_B_index" ON "_StoreAndCategory"("B");

-- AddForeignKey
ALTER TABLE "_StoreAndCategory" ADD CONSTRAINT "_StoreAndCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreAndCategory" ADD CONSTRAINT "_StoreAndCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;
