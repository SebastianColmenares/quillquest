/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `genres` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `book_id_key` ON `book`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `genres_id_key` ON `genres`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_id_key` ON `user`(`id`);
