/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Mod` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Mod` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Mod_email_key" ON "Mod"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mod_phone_key" ON "Mod"("phone");
