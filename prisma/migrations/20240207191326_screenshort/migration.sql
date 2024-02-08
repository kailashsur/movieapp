/*
  Warnings:

  - Added the required column `screenshort` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `watchlink` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "screenshort" TEXT NOT NULL,
ADD COLUMN     "watchlink" TEXT NOT NULL;
