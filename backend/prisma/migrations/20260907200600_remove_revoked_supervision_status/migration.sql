CREATE TYPE "StudentSupervisionStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'REJECTED');

ALTER TABLE "StudentSupervision"
  ALTER COLUMN status DROP DEFAULT,
  ALTER COLUMN status TYPE "StudentSupervisionStatus_new"
    USING (status::text::"StudentSupervisionStatus_new");

ALTER TABLE "StudentSupervision"
  ALTER COLUMN status SET DEFAULT 'PENDING'::"StudentSupervisionStatus_new";

DROP TYPE "StudentSupervisionStatus";

ALTER TYPE "StudentSupervisionStatus_new" RENAME TO "StudentSupervisionStatus";
