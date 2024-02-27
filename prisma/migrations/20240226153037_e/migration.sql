/*
  Warnings:

  - You are about to drop the column `penalty` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "penalty",
ADD COLUMN     "penaltyEndDate" TIMESTAMP(3);
