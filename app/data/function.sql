-- SQLBook: Code
-- FUNCTION: public.insert_game(integer, character varying)

-- DROP FUNCTION IF EXISTS public.insert_game(integer, character varying);

CREATE OR REPLACE FUNCTION public.insert_game(
	api_id_value integer,
	slug_value character varying)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    game_id integer;
BEGIN
    -- Try inserting a new line with ON CONFLICT
    INSERT INTO "game"("api_id", "slug") VALUES (api_id_value, slug_value)
    ON CONFLICT (api_id) DO NOTHING
    RETURNING "id" INTO game_id;

    -- If the insert was successful, return the automatically generated ID
    IF game_id IS NOT NULL THEN
        RETURN game_id;
    END IF;

    -- If the insert failed because a record with api_id already exists,
    -- get the existing id and return it
    SELECT "id" INTO game_id FROM "game" WHERE "api_id" = api_id_value;
    RETURN game_id;
END;
$BODY$;

ALTER FUNCTION public.insert_game(integer, character varying)
    OWNER TO retrogame;