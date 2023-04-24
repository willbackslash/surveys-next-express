import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function create(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  // @ts-ignore
  if (!session?.user?.groups.includes('SURVEY_ADMIN')) {
    return res.status(400).json({"response": "Unauthorized", "code": 401});
  }

  try {
    console.log(req.body);
    const result = await prisma.survey.create({data: req.body, include: {options: true}});
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(403).json({ err: "Error occured." });
  }
}

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  // @ts-ignore
  if (!session?.user?.groups.includes('SURVEY_ADMIN')) {
    return res.status(400).json({"response": "Unauthorized", "code": 401})
  }
  try {
    const result = await prisma.survey.delete({
      where: { id: req.body.id },
      include: {
        options: true,
        answers: true,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(403).json({ err: "Error occurred." });
  }
}

async function getSurveyById(req: NextApiRequest, res: NextApiResponse, id: number) {
  const session = await getServerSession(req, res, authOptions)
  // @ts-ignore
  if (!session?.user?.groups.includes('SURVEY_ADMIN')) {
    return res.status(400).json({"response": "Unauthorized", "code": 401})
  }
  try {
    const result = await prisma.survey.findUnique({include: { options: true }, where: {id}});
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured." });
  }
}

async function getAllSurveys(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await prisma.survey.findMany({include: { options: true },});
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ err: "Error occured." });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  console.log("session", session);

  if(!session) res.status(401).json({"response": "Unauthorized", "code": 401})

  if (req.method == 'POST') {
    return await create(req, res);
  }

  if (req.method == 'DELETE') {
    return await remove(req, res);
  }

  const { id } = req.query
  if (id) {
    return await getSurveyById(req, res, Number(id)); 
  }

  return getAllSurveys(req, res);
}