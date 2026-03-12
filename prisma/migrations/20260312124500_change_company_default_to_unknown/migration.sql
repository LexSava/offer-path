ALTER TABLE "Application"
ALTER COLUMN "company" SET DEFAULT 'Unknown';

UPDATE "Application"
SET "company" = 'Unknown'
WHERE "company" = 'not specified';
