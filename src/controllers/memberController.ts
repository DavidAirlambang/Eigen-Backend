import prisma from "../utils/prisma";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const memberClient = prisma.member;

// getAll
export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const member = await memberClient.findMany();
    const allMember = await Promise.all(
      member.map(async (member) => {
        const loanCount = await prisma.loan.count({
          where: {
            memberCode: member.code,
            returnedAt: null,
          },
        });
        return { ...member, loanCount };
      })
    );
    return res.status(StatusCodes.OK).json({ data: allMember });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// create
export const createMember = async (req: Request, res: Response) => {
  try {
    const member = await memberClient.create({ data: req.body });
    return res.status(StatusCodes.CREATED).json({ data: member });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// update
export const updateMember = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const member = await memberClient.update({
      where: { code },
      data: req.body,
    });
    return res.status(StatusCodes.OK).json({ data: member });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
