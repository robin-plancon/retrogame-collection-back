const axios = require('axios');
const client = require('./dbClient.js');
require('dotenv').config();


const userDataMapper = {
    
    getUserDetail: async function (id) {
        
        const sqlQuery = `SELECT * FROM "user" WHERE id = $1`;
        const result = await client.query(sqlQuery, [id]);
        return result.rows[0];
        
    },
    
    signUp: async function(nickname, email, password) {
        const sqlQuery = `INSERT INTO "user" ("nickname", "email", "password") VALUES ($1, $2, $3) RETURNING *`;
        const result = await client.query(sqlQuery, [nickname, email, password]);
        return result.rows[0];
    },
    
    getUserByNickname: async function(nickname) {
        const sqlQuery = `SELECT * FROM "user" WHERE nickname = $1`;
        const result = await client.query(sqlQuery, [nickname]);
        return result.rows[0];
        
        
    },
    
    patchUser: async function (newPassword, userId) {
        const sqlQuery = `UPDATE "user" SET password = $1 WHERE id = $2`;
        const result = await client.query(sqlQuery, [newPassword, userId]);
        return null;
    },

    deleteUser: async function (userId) {
        const collectionQuery = `DELETE FROM "collection" WHERE collection.user_id = $1`;
        const collectionResult = await client.query(collectionQuery, [userId]);
        const userQuery = `DELETE FROM "user" WHERE id = $1`;
        const userResult = await client.query(userQuery, [userId]);
        return userResult.rows[0];

    },
}




module.exports = userDataMapper;