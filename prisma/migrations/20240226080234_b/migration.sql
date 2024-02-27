/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `bookCode` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_bookId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "bookId",
ADD COLUMN     "bookCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_bookCode_fkey" FOREIGN KEY ("bookCode") REFERENCES "Book"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
