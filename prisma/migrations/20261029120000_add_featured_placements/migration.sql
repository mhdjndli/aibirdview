-- AlterTable
ALTER TABLE "Tool" ADD COLUMN "featuredUntil" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "FeaturedPlacement" (
    "id" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "toolId" TEXT,
    "submissionId" TEXT,
    "stripeSessionId" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeaturedPlacement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tool_featuredUntil_idx" ON "Tool"("featuredUntil");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedPlacement_stripeSessionId_key" ON "FeaturedPlacement"("stripeSessionId");

-- CreateIndex
CREATE INDEX "FeaturedPlacement_toolId_idx" ON "FeaturedPlacement"("toolId");

-- CreateIndex
CREATE INDEX "FeaturedPlacement_submissionId_idx" ON "FeaturedPlacement"("submissionId");

-- AddForeignKey
ALTER TABLE "FeaturedPlacement" ADD CONSTRAINT "FeaturedPlacement_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturedPlacement" ADD CONSTRAINT "FeaturedPlacement_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
