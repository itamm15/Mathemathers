-- CreateEnum
CREATE TYPE "StudentSupervisionStatus" AS ENUM ('PENDING', 'ACTIVE', 'REVOKED');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'student';

-- CreateTable
CREATE TABLE "StudentSupervision" (
    "id" TEXT NOT NULL,
    "supervisorId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" "StudentSupervisionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "StudentSupervision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudentSupervision_studentId_status_idx" ON "StudentSupervision"("studentId", "status");

-- CreateIndex
CREATE INDEX "StudentSupervision_supervisorId_status_idx" ON "StudentSupervision"("supervisorId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "StudentSupervision_supervisorId_studentId_key" ON "StudentSupervision"("supervisorId", "studentId");

-- AddForeignKey
ALTER TABLE "StudentSupervision" ADD CONSTRAINT "StudentSupervision_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSupervision" ADD CONSTRAINT "StudentSupervision_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
