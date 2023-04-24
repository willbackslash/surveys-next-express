-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_surveyId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_surveyId_fkey";

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
