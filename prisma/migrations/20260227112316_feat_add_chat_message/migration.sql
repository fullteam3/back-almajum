-- CreateTable
CREATE TABLE `tbl_chat_message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fromId` INTEGER NOT NULL,
    `toId` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_chat_message` ADD CONSTRAINT `tbl_chat_message_fromId_fkey` FOREIGN KEY (`fromId`) REFERENCES `tbl_member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_chat_message` ADD CONSTRAINT `tbl_chat_message_toId_fkey` FOREIGN KEY (`toId`) REFERENCES `tbl_member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
