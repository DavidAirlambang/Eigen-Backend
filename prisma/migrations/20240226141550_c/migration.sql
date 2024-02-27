/*
  Warnings:

  - You are about to drop the column `memberId` on the `Loan` table. All the data in the column will be lost.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Member` table. All the data in the column will be lost.
  - Added the required column `memberCode` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_memberId_fkey";

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "memberId",
ADD COLUMN     "memberCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("code");

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "Member"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
