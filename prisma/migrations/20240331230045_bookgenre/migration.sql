/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[genreId]` on the table `book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreId` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `authorId` INTEGER NOT NULL,
    ADD COLUMN `genreId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `book_authorId_key` ON `book`(`authorId`);

-- CreateIndex
CREATE UNIQUE INDEX `book_genreId_key` ON `book`(`genreId`);

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
