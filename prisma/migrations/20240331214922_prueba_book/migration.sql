/*
  Warnings:

  - You are about to drop the column `authorId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `book_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `book_genreId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `authorId`,
    DROP COLUMN `description`,
    DROP COLUMN `genreId`,
    DROP COLUMN `price`;
