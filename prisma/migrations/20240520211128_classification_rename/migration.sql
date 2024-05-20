/*
  Warnings:

  - You are about to drop the column `classficationId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_classficationId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "classficationId",
ADD COLUMN     "classificationId" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES "Classification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
