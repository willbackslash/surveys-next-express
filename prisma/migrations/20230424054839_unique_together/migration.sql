/*
  Warnings:

  - A unique constraint covering the columns `[userEmail,surveyId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Answer_userEmail_key";

-- CreateIndex
CREATE UNIQUE INDEX "Answer_userEmail_surveyId_key" ON "Answer"("userEmail", "surveyId");
