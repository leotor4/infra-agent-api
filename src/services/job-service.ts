import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getNextJob = async (req: Request, res: Response) => {
  const lastJob = await prisma.job.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(lastJob);
};

export const createJob = async (req: Request, res: Response) => {
  const { project, version, createdBy } = req.body;

  if (!project || !version || !createdBy) {
    return res
      .status(400)
      .json({ message: "Informe 'project', 'version' e 'createdBy'" });
  }

  const result = await prisma.job.create({
    data: {
      project,
      version,
      createdBy,
    },
  });

  res.status(201).json(result)
};

export const concludeJob = async (req: Request, res: Response) => {

    const { jobId } = req.params;

    console.log("Job id", jobId)

    const id = Number(jobId);

    if (!jobId || Number.isNaN(id) || !Number.isInteger(id)) {
        return res.status(400).json({ message: "id must be a valid integer" });
    }

    const job = await prisma.job.findUnique({ where: { id }});

    if(!job)
        return res.json(null);

    job.doneAt = new Date();

    await prisma.job.update({ data: job, where: {id}});

    return res.json(job);

}