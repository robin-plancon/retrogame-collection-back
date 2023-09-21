-- SQLBook: Code
-- Insérer trois utilisateurs fictifs avec noms et adresses
INSERT INTO "user" ("email", "nickname", "password") VALUES
    ('flo@example.com', 'Flo', 'motdepasse1'),
    ('lionel@example.com', 'Lionel', 'motdepasse2'),
    ('vanessa@example.com', 'Vanessa', 'motdepasse3');

-- Insérer les jeux avec les ID spécifiés
INSERT INTO "game" ("id") VALUES
    (260835),
    (260836),
    (260837),
    (260838),
    (260839),
    (260840);

-- Associer des jeux aux utilisateurs (créer des collections)
-- Utilisateur Flo
INSERT INTO "collection" ("user_id", "game_id") VALUES
    (1, 260835),
    (1, 260836),
    (1, 260837);

-- Utilisateur Lionel
INSERT INTO "collection" ("user_id", "game_id") VALUES
    (2, 260836),
    (2, 260838),
    (2, 260839);

-- Utilisateur Vanessa
INSERT INTO "collection" ("user_id", "game_id") VALUES
    (3, 260837),
    (3, 260839),
    (3, 260840);