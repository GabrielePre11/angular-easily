/*
  Warnings:

  - A unique constraint covering the columns `[brandId,model,year]` on the table `Car` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Car_brandId_model_year_key" ON "Car"("brandId", "model", "year");
