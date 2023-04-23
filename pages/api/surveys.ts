import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function create(req: NextApiRequest, res: NextApiResponse) {
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
  try {
    const result = await prisma.survey.delete({ where: {id: req.body.id,}, include: {options: true}});
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(403).json({ err: "Error occured." });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
      return await create(req, res);
    }

    if (req.method == 'DELETE') {
      return await remove(req, res);
      // TODO: add reload or redirect to homepage
    }

    const session = await getServerSession(req, res, authOptions)
    console.log("session endpoint final", session);
    if(!session) res.status(401).json({"response": "Unauthorized", "code": 401})
    //if(!session.user.groups.includes('SURVEY_ADMIN')){
     //   res.status(400).json({"response": "Unauthorized", "code": 401})
    //}

    try {
      const result = await prisma.survey.findMany({include: { options: true },});
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(403).json({ err: "Error occured." });
    }
}