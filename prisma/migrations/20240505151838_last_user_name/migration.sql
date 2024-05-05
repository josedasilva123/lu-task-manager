/*
  Warnings:

  - You are about to drop the column `lastUserId` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "lastUserId",
ADD COLUMN     "lastUserName" TEXT;
