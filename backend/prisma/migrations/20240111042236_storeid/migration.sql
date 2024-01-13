/*
  Warnings:

  - The primary key for the `Store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserPoint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[store_id]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_store_id_fkey";

-- DropForeignKey
ALTER TABLE "FeedBack" DROP CONSTRAINT "FeedBack_store_id_fkey";

-- DropForeignKey
ALTER TABLE "OpeningHour" DROP CONSTRAINT "OpeningHour_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_store_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPoint" DROP CONSTRAINT "UserPoint_store_id_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteStore" DROP CONSTRAINT "_FavoriteStore_A_fkey";

-- DropForeignKey
ALTER TABLE "_StoreAndCategory" DROP CONSTRAINT "_StoreAndCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_StoreService" DROP CONSTRAINT "_StoreService_B_fkey";

-- DropForeignKey
ALTER TABLE "_StoreStatus" DROP CONSTRAINT "_StoreStatus_B_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "store_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Coupon" ALTER COLUMN "store_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FeedBack" ALTER COLUMN "store_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OpeningHour" ALTER COLUMN "store_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "store_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Store" DROP CONSTRAINT "Store_pkey",
ALTER COLUMN "store_id" DROP DEFAULT,
ALTER COLUMN "store_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id");
DROP SEQUENCE "Store_store_id_seq";

-- AlterTable
ALTER TABLE "UserPoint" DROP CONSTRAINT "UserPoint_pkey",
ALTER COLUMN "store_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserPoint_pkey" PRIMARY KEY ("user_id", "store_id");

-- AlterTable
ALTER TABLE "_FavoriteStore" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_StoreAndCategory" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_StoreService" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_StoreStatus" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_id_key" ON "Store"("store_id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningHour" ADD CONSTRAINT "OpeningHour_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteStore" ADD CONSTRAINT "_FavoriteStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreAndCategory" ADD CONSTRAINT "_StoreAndCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreStatus" ADD CONSTRAINT "_StoreStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreService" ADD CONSTRAINT "_StoreService_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;
