import prisma from "../utils/prisma";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const bookClient = prisma.book;

// getAll
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookClient.findMany({
      where: { stock: { gt: 0 } },
    });
    return res.status(StatusCodes.OK).json({ data: books });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// create
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await bookClient.create({ data: req.body });
    return res.status(StatusCodes.CREATED).json({ data: book });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// update
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const book = await bookClient.update({
      where: { code },
      data: req.body,
    });
    return res.status(StatusCodes.OK).json({ data: book });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
