-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "logoMediaId" TEXT,
ADD COLUMN     "screenshot1MediaId" TEXT,
ADD COLUMN     "screenshot2MediaId" TEXT,
ADD COLUMN     "screenshot3MediaId" TEXT;

-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "screenshot1MediaId" TEXT,
ADD COLUMN     "screenshot2MediaId" TEXT,
ADD COLUMN     "screenshot3MediaId" TEXT;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_screenshot1MediaId_fkey" FOREIGN KEY ("screenshot1MediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_screenshot2MediaId_fkey" FOREIGN KEY ("screenshot2MediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_screenshot3MediaId_fkey" FOREIGN KEY ("screenshot3MediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_logoMediaId_fkey" FOREIGN KEY ("logoMediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_screenshot1MediaId_fkey" FOREIGN KEY ("screenshot1MediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_screenshot2MediaId_fkey" FOREIGN KEY ("screenshot2MediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_screenshot3MediaId_fkey" FOREIGN KEY ("screenshot3MediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
