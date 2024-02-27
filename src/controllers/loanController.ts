import prisma from "../utils/prisma";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const loanClient = prisma.loan;

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { memberCode, bookCode } = req.body;

    // check member
    const booksCount = await loanClient.count({
      where: { memberCode, returnedAt: null },
    });
    if (booksCount >= 2) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Member has reached maximum borrow limit" });
    }

    // check book
    const book = await prisma.book.findUnique({ where: { code: bookCode } });
    if (!book || book.stock <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Book not available" });
    }

    // check penalty
    const member = await prisma.member.findUnique({
      where: {
        code: memberCode,
      },
    });
    if (member.penaltyEndDate && member.penaltyEndDate > new Date()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Member is currently penalized",
      });
    }

    // borrow
    const loan = await loanClient.create({
      data: {
        memberCode,
        bookCode,
      },
    });

    // update stock
    await prisma.book.update({
      where: { code: bookCode },
      data: { stock: { decrement: 1 } },
    });

    return res.status(StatusCodes.CREATED).json({ data: loan });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const { memberCode, bookCode } = req.body;
    const loan = await loanClient.findFirst({
      where: { memberCode, bookCode, returnedAt: null },
    });

    // check book
    if (!loan) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Book not found in member's loan" });
    }

    // return book
    const returnBook = await prisma.loan.update({
      where: { id: loan.id },
      data: { returnedAt: new Date() },
    });

    await prisma.book.update({
      where: { code: bookCode },
      data: { stock: { increment: 1 } },
    });

    // check date
    const returnDate = new Date();
    const borrowDate = loan.borrowedAt;
    const diffTime = Math.abs(returnDate.getTime() - borrowDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
      await prisma.member.update({
        where: { code: memberCode },
        data: {
          penaltyEndDate: new Date(
            returnDate.setDate(returnDate.getDate() + 3)
          ),
        },
      });
    }

    return res.status(StatusCodes.OK).json({ data: returnBook });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
