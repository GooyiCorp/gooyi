-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('restaurant', 'beverage', 'sushi');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "last_login" TIMESTAMP(3) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "user_id" INTEGER NOT NULL,
    "message" BOOLEAN NOT NULL,
    "terms" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Store" (
    "store_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "active" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "enter_date" TIMESTAMP(3) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "store_id" INTEGER NOT NULL,
    "location" geography(Point, 4326) NOT NULL,
    "street" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "detail" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OpeningHour" (
    "store_id" INTEGER NOT NULL,
    "Mon" TEXT NOT NULL,
    "Tue" TEXT NOT NULL,
    "Wed" TEXT NOT NULL,
    "Thu" TEXT NOT NULL,
    "Fri" TEXT NOT NULL,
    "Sat" TEXT NOT NULL,
    "Sun" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserPoint" (
    "user_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "point" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteStore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_user_id_key" ON "Setting"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_store_id_key" ON "Address"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "OpeningHour_store_id_key" ON "OpeningHour"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPoint_user_id_key" ON "UserPoint"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPoint_store_id_key" ON "UserPoint"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteStore_AB_unique" ON "_FavoriteStore"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteStore_B_index" ON "_FavoriteStore"("B");

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningHour" ADD CONSTRAINT "OpeningHour_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteStore" ADD CONSTRAINT "_FavoriteStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteStore" ADD CONSTRAINT "_FavoriteStore_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
