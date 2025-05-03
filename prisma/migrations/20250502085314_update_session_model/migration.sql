/*
  Warnings:

  - You are about to drop the column `active_expires` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `idle_expires` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the `keys` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expiresAt` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "keys" DROP CONSTRAINT "keys_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropIndex
DROP INDEX "sessions_id_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "active_expires",
DROP COLUMN "idle_expires",
DROP COLUMN "user_id",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "keys";

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
