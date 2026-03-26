-- AlterTable
ALTER TABLE `tbl_medicine` ADD COLUMN `image_url` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `tbl_timer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `medicine_id` INTEGER NOT NULL,
    `intake_time` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_timer` ADD CONSTRAINT `tbl_timer_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `tbl_member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_timer` ADD CONSTRAINT `tbl_timer_medicine_id_fkey` FOREIGN KEY (`medicine_id`) REFERENCES `tbl_medicine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
