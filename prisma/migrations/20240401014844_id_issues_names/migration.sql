/*
  Warnings:

  - You are about to drop the column `authorId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `book` table. All the data in the column will be lost.
  - Added the required column `authorName` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `book_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `book_genreId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `authorId`,
    DROP COLUMN `genreId`,
    ADD COLUMN `authorName` VARCHAR(191) NOT NULL,
    ADD COLUMN `genreName` VARCHAR(191) NOT NULL DEFAULT 'fiction';

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_authorName_fkey` FOREIGN KEY (`authorName`) REFERENCES `user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_genreName_fkey` FOREIGN KEY (`genreName`) REFERENCES `genres`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
