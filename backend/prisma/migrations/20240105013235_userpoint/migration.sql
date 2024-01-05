-- DropIndex
DROP INDEX "UserPoint_store_id_key";

-- DropIndex
DROP INDEX "UserPoint_user_id_key";

-- AlterTable
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_pkey" PRIMARY KEY ("user_id", "store_id");
