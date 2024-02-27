/*
  Warnings:

  - The `penalty` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "penalty",
ADD COLUMN     "penalty" TIMESTAMP(3);
