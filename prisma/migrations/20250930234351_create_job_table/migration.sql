-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "project" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
