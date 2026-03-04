/*
  Warnings:

  - You are about to drop the column `opposition` on the `Application` table. All the data in the column will be lost.
  - Added the required column `specialization` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "opposition",
ADD COLUMN     "specialization" TEXT NOT NULL,
ALTER COLUMN "mainStack" SET NOT NULL,
ALTER COLUMN "mainStack" SET DATA TYPE TEXT;
