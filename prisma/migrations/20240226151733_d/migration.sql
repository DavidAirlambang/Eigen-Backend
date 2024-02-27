/*
  Warnings:

  - You are about to drop the column `penalty` on the `Loan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "penalty";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "penalty" BOOLEAN NOT NULL DEFAULT false;
