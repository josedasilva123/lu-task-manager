/*
  Warnings:

  - You are about to drop the column `taskId` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_taskId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "taskId";

-- CreateTable
CREATE TABLE "_FileToTask" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FileToTask_AB_unique" ON "_FileToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToTask_B_index" ON "_FileToTask"("B");

-- AddForeignKey
ALTER TABLE "_FileToTask" ADD CONSTRAINT "_FileToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToTask" ADD CONSTRAINT "_FileToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
