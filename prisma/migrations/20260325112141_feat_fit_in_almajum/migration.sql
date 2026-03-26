/*
  Warnings:

  - You are about to drop the `tbl_chat_message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_chat_message` DROP FOREIGN KEY `tbl_chat_message_fromId_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_chat_message` DROP FOREIGN KEY `tbl_chat_message_toId_fkey`;

-- DropTable
DROP TABLE `tbl_chat_message`;

-- CreateTable
CREATE TABLE `tbl_medicine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `type` ENUM('OTC', 'SUPPLEMENT') NOT NULL,
    `category_id` INTEGER NULL,
    `price` INTEGER NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `thumbnail` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `parent_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ingredient_liver_impact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_id` INTEGER NOT NULL,
    `impact_level` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `warning_message` TEXT NULL,

    UNIQUE INDEX `tbl_ingredient_liver_impact_ingredient_id_key`(`ingredient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_interaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_a_id` INTEGER NOT NULL,
    `ingredient_b_id` INTEGER NOT NULL,
    `type` ENUM('CONFLICT', 'RECOMMENDED') NOT NULL,
    `message` TEXT NOT NULL,
    `solution` TEXT NULL,

    UNIQUE INDEX `tbl_interaction_ingredient_a_id_ingredient_b_id_key`(`ingredient_a_id`, `ingredient_b_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_medicine_ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicine_id` INTEGER NOT NULL,
    `ingredient_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_symptom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_medicine_symptom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicine_id` INTEGER NOT NULL,
    `symptom_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `medicine_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_inquiry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `status` ENUM('PENDING', 'ANSWERED') NOT NULL DEFAULT 'PENDING',
    `answer` TEXT NULL,
    `answered_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_medicine` ADD CONSTRAINT `tbl_medicine_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tbl_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_category` ADD CONSTRAINT `tbl_category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `tbl_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_ingredient_liver_impact` ADD CONSTRAINT `tbl_ingredient_liver_impact_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `tbl_ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_interaction` ADD CONSTRAINT `tbl_interaction_ingredient_a_id_fkey` FOREIGN KEY (`ingredient_a_id`) REFERENCES `tbl_ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_interaction` ADD CONSTRAINT `tbl_interaction_ingredient_b_id_fkey` FOREIGN KEY (`ingredient_b_id`) REFERENCES `tbl_ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_medicine_ingredient` ADD CONSTRAINT `tbl_medicine_ingredient_medicine_id_fkey` FOREIGN KEY (`medicine_id`) REFERENCES `tbl_medicine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_medicine_ingredient` ADD CONSTRAINT `tbl_medicine_ingredient_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `tbl_ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_medicine_symptom` ADD CONSTRAINT `tbl_medicine_symptom_medicine_id_fkey` FOREIGN KEY (`medicine_id`) REFERENCES `tbl_medicine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_medicine_symptom` ADD CONSTRAINT `tbl_medicine_symptom_symptom_id_fkey` FOREIGN KEY (`symptom_id`) REFERENCES `tbl_symptom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_cart` ADD CONSTRAINT `tbl_cart_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `tbl_member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_cart` ADD CONSTRAINT `tbl_cart_medicine_id_fkey` FOREIGN KEY (`medicine_id`) REFERENCES `tbl_medicine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_inquiry` ADD CONSTRAINT `tbl_inquiry_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `tbl_member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
