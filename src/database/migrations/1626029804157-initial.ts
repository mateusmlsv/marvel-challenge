import { MigrationInterface, QueryRunner } from 'typeorm'

export class initial1626029804157 implements MigrationInterface {
    name = 'initial1626029804157'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB')
      await queryRunner.query("CREATE TABLE `favorites` (`id` int NOT NULL AUTO_INCREMENT, `marvel_id` varchar(255) NOT NULL, `favorite_type` enum ('character', 'comic') NOT NULL DEFAULT 'character', `thumbnail` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB")
      await queryRunner.query('ALTER TABLE `favorites` ADD CONSTRAINT `FK_e747534006c6e3c2f09939da60f` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `favorites` DROP FOREIGN KEY `FK_e747534006c6e3c2f09939da60f`')
      await queryRunner.query('DROP TABLE `favorites`')
      await queryRunner.query('DROP TABLE `users`')
    }
}
