import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type VoteRequestBody = {
    surveyId: number;
    optionIndex: number;
    voterEmail: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  console.log("session", session);

  if(!session) res.status(401).json({"response": "Unauthorized", "code": 401})
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log("Vote body", req.body);
  const { surveyId, optionIndex } = req.body as VoteRequestBody;
  const userEmail = session?.user?.email || "";

  try {

    const option = await prisma.option.findFirst({
      where: { surveyId, index: optionIndex },
    });

    if (!option) {
      return res.status(404).json({ message: 'Option not found' });
    }

    const answer = await prisma.answer.findFirst({
      where: { surveyId, userEmail },
    });
    if (answer) {
      return res.status(400).json({ message: 'You have already voted on this survey' });
    }

    await prisma.answer.create({
      data: { optionId: option.id, surveyId, userEmail },
    });

    res.status(200).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}