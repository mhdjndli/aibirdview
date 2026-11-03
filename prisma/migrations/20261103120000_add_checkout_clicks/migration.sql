-- CreateTable
CREATE TABLE "CheckoutClick" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "submissionId" TEXT,
    "toolId" TEXT,
    "fastTrack" BOOLEAN NOT NULL DEFAULT false,
    "featurePlan" TEXT,
    "amountCents" INTEGER NOT NULL,
    "source" TEXT,
    "stripeSessionId" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckoutClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutClick_stripeSessionId_key" ON "CheckoutClick"("stripeSessionId");

-- CreateIndex
CREATE INDEX "CheckoutClick_createdAt_idx" ON "CheckoutClick"("createdAt");

-- CreateIndex
CREATE INDEX "CheckoutClick_submissionId_idx" ON "CheckoutClick"("submissionId");

-- CreateIndex
CREATE INDEX "CheckoutClick_toolId_idx" ON "CheckoutClick"("toolId");

-- AddForeignKey
ALTER TABLE "CheckoutClick" ADD CONSTRAINT "CheckoutClick_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckoutClick" ADD CONSTRAINT "CheckoutClick_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Backfill: same-day review checkouts opened before tracking started. Only
-- those left a trace (Submission.stripeSessionId); the click time wasn't
-- stored, so the submission time stands in for it.
INSERT INTO "CheckoutClick" ("id", "email", "toolName", "submissionId", "fastTrack", "amountCents", "stripeSessionId", "paidAt", "createdAt")
SELECT 'backfill_' || "id", lower("email"), "name", "id", true, COALESCE("amountPaidCents", 900), "stripeSessionId", "paidAt", "createdAt"
FROM "Submission"
WHERE "stripeSessionId" IS NOT NULL;
