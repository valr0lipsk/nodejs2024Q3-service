import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1732011742598 implements MigrationInterface {
    name = 'Initial1732011742598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_artists" ("favorite_id" uuid NOT NULL, "artist_id" uuid NOT NULL, CONSTRAINT "PK_6c0f256eb7cc30d970a85b7fbe2" PRIMARY KEY ("favorite_id", "artist_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_44a5668f12dbc1bccccf60f58e" ON "favorites_artists" ("favorite_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8bfb6dd796755ef300ab5a71b2" ON "favorites_artists" ("artist_id") `);
        await queryRunner.query(`CREATE TABLE "favorites_albums" ("favorite_id" uuid NOT NULL, "album_id" uuid NOT NULL, CONSTRAINT "PK_6d7994e70d70f1bfd79e3dc9975" PRIMARY KEY ("favorite_id", "album_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4f64b7791871cf790184741082" ON "favorites_albums" ("favorite_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f17950531ea5f11fae13c7bbbd" ON "favorites_albums" ("album_id") `);
        await queryRunner.query(`CREATE TABLE "favorites_tracks" ("favorite_id" uuid NOT NULL, "track_id" uuid NOT NULL, CONSTRAINT "PK_c68098b9ed049057444d5be7cae" PRIMARY KEY ("favorite_id", "track_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e5d2436b6089495356d72efaf" ON "favorites_tracks" ("favorite_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4b8a7703eafd7a5041fb494838" ON "favorites_tracks" ("track_id") `);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_44a5668f12dbc1bccccf60f58e9" FOREIGN KEY ("favorite_id") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_8bfb6dd796755ef300ab5a71b27" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_4f64b7791871cf7901847410821" FOREIGN KEY ("favorite_id") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_f17950531ea5f11fae13c7bbbde" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_6e5d2436b6089495356d72efaf2" FOREIGN KEY ("favorite_id") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_4b8a7703eafd7a5041fb494838c" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_4b8a7703eafd7a5041fb494838c"`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_6e5d2436b6089495356d72efaf2"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_f17950531ea5f11fae13c7bbbde"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_4f64b7791871cf7901847410821"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_8bfb6dd796755ef300ab5a71b27"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_44a5668f12dbc1bccccf60f58e9"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4b8a7703eafd7a5041fb494838"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6e5d2436b6089495356d72efaf"`);
        await queryRunner.query(`DROP TABLE "favorites_tracks"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f17950531ea5f11fae13c7bbbd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4f64b7791871cf790184741082"`);
        await queryRunner.query(`DROP TABLE "favorites_albums"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8bfb6dd796755ef300ab5a71b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44a5668f12dbc1bccccf60f58e"`);
        await queryRunner.query(`DROP TABLE "favorites_artists"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "artists"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
