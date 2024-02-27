/*
  Warnings:

  - Made the column `penaltyEndDate` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "penaltyEndDate" SET NOT NULL,
ALTER COLUMN "penaltyEndDate" SET DEFAULT '1999-12-31 23:59:59 +00:00';
