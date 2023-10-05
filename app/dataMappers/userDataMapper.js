const axios = require('axios');
const client = require('./dbClient.js');
require('dotenv').config();


const userDataMapper = {
    
    // Retrieve User Details from database
    getUserDetail: async function (id) {
        
        const sqlQuery = `SELECT * FROM "user" WHERE id = $1`;
        const result = await client.query(sqlQuery, [id]);
        return result.rows[0];  
    },
    
    // Allow visitor to create a user account
    signUp: async function(nickname, email, password) {
        const sqlQuery = `INSERT INTO "user" ("nickname", "email", "password") VALUES ($1, $2, $3) RETURNING *`;
        const result = await client.query(sqlQuery, [nickname, email, password]);
        return result.rows[0];
    },

    // Retrieve user by nickname from the database
    getUserByNickname: async function(nickname) {
        const sqlQuery = `SELECT * FROM "user" WHERE nickname = $1`;
        const result = await client.query(sqlQuery, [nickname]);
        return result.rows[0];    
    },
    
    // Allow user to modify its password
    patchUser: async function (newPassword, userId) {
        const sqlQuery = `UPDATE "user" SET password = $1 WHERE id = $2`;
        const result = await client.query(sqlQuery, [newPassword, userId]);
        return null;
    },

    /* Allow user to delete its account :
            1- We delete entries from "collection" table in the database related to the user
            2- We delete user related entry from "user" table in the database */
    deleteUser: async function (userId) {
        const collectionQuery = `DELETE FROM "collection" WHERE collection.user_id = $1`;
        const collectionResult = await client.query(collectionQuery, [userId]);
        const userQuery = `DELETE FROM "user" WHERE id = $1`;
        const userResult = await client.query(userQuery, [userId]);
        return userResult.rows[0];
    },

    // Retrieve user by email from the database
    getUserByEmail: async function(email) {
        const sqlQuery = `SELECT * FROM "user" WHERE email = $1`;
        const result = await client.query(sqlQuery, [email]);
        return result.rows[0];    
    },
};




module.exports = userDataMapper;