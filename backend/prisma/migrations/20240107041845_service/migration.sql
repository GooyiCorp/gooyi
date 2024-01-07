-- CreateTable
CREATE TABLE "Service" (
    "service_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "_StoreService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_StoreService_AB_unique" ON "_StoreService"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreService_B_index" ON "_StoreService"("B");

-- AddForeignKey
ALTER TABLE "_StoreService" ADD CONSTRAINT "_StoreService_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("service_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreService" ADD CONSTRAINT "_StoreService_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;
