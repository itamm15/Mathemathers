-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'parent', 'tutor');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" "Role" NOT NULL DEFAULT 'student';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
