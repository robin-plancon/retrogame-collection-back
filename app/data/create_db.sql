-- SQLBook: Code
BEGIN;

DROP TABLE IF EXISTS "user", "game", "collection";

CREATE TABLE "user"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" VARCHAR NOT NULL UNIQUE,
    "nickname" VARCHAR NOT NULL UNIQUE,
    "password" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "game"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "api_id" INT NOT NULL UNIQUE,
    "slug" VARCHAR NOT NULL UNIQUE  
);

CREATE TABLE "collection"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user" ("id"),
    "game_id" INT NOT NULL REFERENCES "game" ("id"),
    UNIQUE("user_id", "game_id")
);


COMMIT;