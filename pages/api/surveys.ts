import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"
import { PrismaClient } from "@prisma/client";
import { HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK, HTTP_STATUS_UNAUTHORIZED, SURVEY_ADMIN_ROLE } from '../../utils/constants';

const prisma = new PrismaClient();

async function create(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  // @ts-ignore
  if (!session?.user?.groups.includes(SURVEY_ADMIN_ROLE)) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json({message: "Unauthorized"});
  }

  try {
    console.log(req.body);
    const result = await prisma.survey.create({data: req.body, include: {options: true}});
    return res.status(HTTP_STATUS_OK).json(result);
  } catch (err) {
    console.log("Error", err);
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Error occured." });
  }
}

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  // @ts-ignore
  if (!session?.user?.groups.includes(SURVEY_ADMIN_ROLE)) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json({message: "Unauthorized"})
  }
  try {
    const result = await prisma.survey.delete({
      where: { id: req.body.id },
      include: {
        options: true,
        answers: true,
      },
    });
    return res.status(HTTP_STATUS_OK).json(result);
  } catch (err) {
    console.log("Error", err);
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Error occurred." });
  }
}

async function getSurveyById(req: NextApiRequest, res: NextApiResponse, id: number) {
  try {
    const result = await prisma.survey.findUnique({include: { options: true }, where: {id}});
    return res.status(HTTP_STATUS_OK).json(result);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Error occured." });
  }
}

async function getAllSurveys(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await prisma.survey.findMany({include: { options: true },});
    return res.status(HTTP_STATUS_OK).json(result);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Error occured." });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  console.log("session", session);

  if(!session) res.status(HTTP_STATUS_UNAUTHORIZED).json({message: "Unauthorized"})

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