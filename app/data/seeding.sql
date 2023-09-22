-- SQLBook: Code
-- Insérer trois utilisateurs fictifs avec noms et adresses
INSERT INTO "user" ("email", "nickname", "password") VALUES
    ('flo@example.com', 'Flo', 'motdepasse1'),
    ('lionel@example.com', 'Lionel', 'motdepasse2'),
    ('vanessa@example.com', 'Vanessa', 'motdepasse3');

-- Insérer les jeux avec les ID spécifiés
INSERT INTO "game" ("api_id", "slug") VALUES
    (260835, 'servus-64'),
    (260836, 'super-mario-the-power-star-journey'),
    (260837, 'k-16-story-of-steel'),
    (260838, 'torcher-arsonist-of-evil'),
    (260839, 'dynamite-headdy--1'),
    (260840, 'plutonium-mario-64');

-- Associer des jeux aux utilisateurs (créer des collections)
-- Utilisateur Flo
INSERT INTO "collection" ("user_id", "game_id") VALUES
    (1, 1),
    (1, 2),
    (1, 3);

-- Utilisateur Lionel
INSERT INTO "collection" ("user_id", "game_id") VALUES
    (2, 2),
    (2, 4),
    (2, 5);

-- Utilisateur Vanessa
INSERT INTO "collection" ("user_id", "game_id") VALUES
    (3, 3),
    (3, 5),
    (3, 6);