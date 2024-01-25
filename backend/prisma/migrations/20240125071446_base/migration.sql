-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "Mod" (
    "mod_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "Mod_pkey" PRIMARY KEY ("mod_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "last_login" TIMESTAMP(3),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Store" (
    "store_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "logo" TEXT,
    "background" TEXT,
    "enter_date" TIMESTAMP(3) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "store_id" TEXT NOT NULL,
    "location" geography NOT NULL,
    "street" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OpeningHour" (
    "store_id" TEXT NOT NULL,
    "Mon" TEXT NOT NULL,
    "Tue" TEXT NOT NULL,
    "Wed" TEXT NOT NULL,
    "Thu" TEXT NOT NULL,
    "Fri" TEXT NOT NULL,
    "Sat" TEXT NOT NULL,
    "Sun" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Status" (
    "status_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "Service" (
    "service_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "UserPoint" (
    "user_id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "point" INTEGER NOT NULL,

    CONSTRAINT "UserPoint_pkey" PRIMARY KEY ("user_id","store_id")
);

-- CreateTable
CREATE TABLE "FeedBack" (
    "feedback_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedBack_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "FeedBackReply" (
    "feedback_id" INTEGER NOT NULL,
    "reply" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedBackReply_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "quest_id" SERIAL NOT NULL,
    "store_id" TEXT NOT NULL,
    "point" INTEGER NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("quest_id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "coupon_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "expired_in" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("coupon_id")
);

-- CreateTable
CREATE TABLE "CouponCategory" (
    "coupon_category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CouponCategory_pkey" PRIMARY KEY ("coupon_category_id")
);

-- CreateTable
CREATE TABLE "CouponPriority" (
    "coupon_priority_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CouponPriority_pkey" PRIMARY KEY ("coupon_priority_id")
);

-- CreateTable
CREATE TABLE "_FavoriteStore" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_StoreAndCategory" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_StoreStatus" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_StoreService" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteCoupons" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CouponToCouponPriority" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CouponToCouponCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Mod_email_key" ON "Mod"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mod_phone_key" ON "Mod"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_id_key" ON "Store"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_store_id_key" ON "Address"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "OpeningHour_store_id_key" ON "OpeningHour"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_image_key" ON "Category"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_store_id_key" ON "Coupon"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "CouponCategory_name_key" ON "CouponCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CouponPriority_name_key" ON "CouponPriority"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteStore_AB_unique" ON "_FavoriteStore"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteStore_B_index" ON "_FavoriteStore"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StoreAndCategory_AB_unique" ON "_StoreAndCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreAndCategory_B_index" ON "_StoreAndCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StoreStatus_AB_unique" ON "_StoreStatus"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreStatus_B_index" ON "_StoreStatus"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StoreService_AB_unique" ON "_StoreService"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreService_B_index" ON "_StoreService"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteCoupons_AB_unique" ON "_FavoriteCoupons"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteCoupons_B_index" ON "_FavoriteCoupons"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToCouponPriority_AB_unique" ON "_CouponToCouponPriority"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponToCouponPriority_B_index" ON "_CouponToCouponPriority"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToCouponCategory_AB_unique" ON "_CouponToCouponCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponToCouponCategory_B_index" ON "_CouponToCouponCategory"("B");

-- AddForeignKey
ALTER TABLE "Mod" ADD CONSTRAINT "Mod_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningHour" ADD CONSTRAINT "OpeningHour_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedBackReply" ADD CONSTRAINT "FeedBackReply_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "FeedBack"("feedback_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteStore" ADD CONSTRAINT "_FavoriteStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteStore" ADD CONSTRAINT "_FavoriteStore_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreAndCategory" ADD CONSTRAINT "_StoreAndCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreAndCategory" ADD CONSTRAINT "_StoreAndCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreStatus" ADD CONSTRAINT "_StoreStatus_A_fkey" FOREIGN KEY ("A") REFERENCES "Status"("status_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreStatus" ADD CONSTRAINT "_StoreStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreService" ADD CONSTRAINT "_StoreService_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("service_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreService" ADD CONSTRAINT "_StoreService_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteCoupons" ADD CONSTRAINT "_FavoriteCoupons_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("coupon_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteCoupons" ADD CONSTRAINT "_FavoriteCoupons_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToCouponPriority" ADD CONSTRAINT "_CouponToCouponPriority_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("coupon_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToCouponPriority" ADD CONSTRAINT "_CouponToCouponPriority_B_fkey" FOREIGN KEY ("B") REFERENCES "CouponPriority"("coupon_priority_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToCouponCategory" ADD CONSTRAINT "_CouponToCouponCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("coupon_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToCouponCategory" ADD CONSTRAINT "_CouponToCouponCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "CouponCategory"("coupon_category_id") ON DELETE CASCADE ON UPDATE CASCADE;
