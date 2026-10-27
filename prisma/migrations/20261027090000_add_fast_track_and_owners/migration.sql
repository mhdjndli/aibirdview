-- CreateEnum
CREATE TYPE "OwnerMethod" AS ENUM ('SUBMISSION', 'EMAIL_DOMAIN', 'MANUAL');

-- CreateEnum
CREATE TYPE "OwnerStatus" AS ENUM ('ACTIVE', 'PENDING', 'REVOKED');

-- CreateEnum
CREATE TYPE "EditStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN "amountPaidCents" INTEGER,
ADD COLUMN "fastTrack" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "paidAt" TIMESTAMP(3),
ADD COLUMN "publishBy" TIMESTAMP(3),
ADD COLUMN "refundedAt" TIMESTAMP(3),
ADD COLUMN "stripePaymentIntentId" TEXT,
ADD COLUMN "stripeSessionId" TEXT;

-- CreateTable
CREATE TABLE "Member" (
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSignInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "ToolOwner" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "method" "OwnerMethod" NOT NULL,
    "status" "OwnerStatus" NOT NULL DEFAULT 'ACTIVE',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToolOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolEdit" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "status" "EditStatus" NOT NULL DEFAULT 'PENDING',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "ToolEdit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_stripeSessionId_key" ON "Submission"("stripeSessionId");

-- CreateIndex
CREATE INDEX "ToolOwner_email_idx" ON "ToolOwner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ToolOwner_toolId_email_key" ON "ToolOwner"("toolId", "email");

-- CreateIndex
CREATE INDEX "ToolEdit_status_idx" ON "ToolEdit"("status");

-- CreateIndex
CREATE INDEX "ToolEdit_toolId_idx" ON "ToolEdit"("toolId");

-- AddForeignKey
ALTER TABLE "ToolOwner" ADD CONSTRAINT "ToolOwner_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolEdit" ADD CONSTRAINT "ToolEdit_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Data: submissions already waiting keep the 24-hour promise they were given.
UPDATE "Submission" SET "publishBy" = "createdAt" + INTERVAL '24 hours' WHERE "status" = 'PENDING';

-- Data: people who submitted a tool that went live own that listing.
INSERT INTO "ToolOwner" ("id", "toolId", "email", "method", "status", "createdAt", "updatedAt")
SELECT 'own_' || "id", "toolId", lower(trim("email")), 'SUBMISSION', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "Submission"
WHERE "status" = 'APPROVED' AND "toolId" IS NOT NULL
ON CONFLICT ("toolId", "email") DO NOTHING;
