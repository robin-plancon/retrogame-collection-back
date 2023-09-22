SELECT "api_id" FROM "game"
JOIN "collection" ON "game.id" = "collection.game_id"
WHERE "user_id" = $1