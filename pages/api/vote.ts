import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"
import { PrismaClient } from "@prisma/client";
import { HTTP_STATUS_UNAUTHORIZED, BASIC_ROLE, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_OK, HTTP_STATUS_INTERNAL_SERVER_ERROR } from '../../utils/constants';

const prisma = new PrismaClient();

type VoteRequestBody = {
    surveyId: number;
    optionIndex: number;
    voterEmail: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  console.log("session", session);

  if(!session) res.status(HTTP_STATUS_UNAUTHORIZED).json({message: "Unauthorized"})
  if (req.method !== 'POST') {
    return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: 'Method not allowed' });
  }

  // @ts-ignore
  if (!session?.user?.groups.includes(BASIC_ROLE)) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json({message: "Unauthorized"})
  }

  console.log("Vote body", req.body);
  const { surveyId, optionIndex } = req.body as VoteRequestBody;
  const userEmail = session?.user?.email || "";

  try {

    const option = await prisma.option.findFirst({
      where: { surveyId, index: optionIndex },
    });

    if (!option) {
      return res.status(HTTP_STATUS_NOT_FOUND).json({ message: 'Option not found' });
    }

    const answer = await prisma.answer.findFirst({
      where: { surveyId, userEmail },
    });
    if (answer) {
      return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: 'You have already voted on this survey' });
    }

    await prisma.answer.create({
      data: { optionId: option.id, surveyId, userEmail },
    });

    res.status(HTTP_STATUS_OK).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
}