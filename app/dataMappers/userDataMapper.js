const axios = require('axios');
const client = require('./dbClient.js')
require('dotenv').config();


const userDataMapper = {
    
    async getUserDetail(id) {
        
        const sqlQuery = `SELECT * FROM "user" WHERE id = $1`
        const result = await client.query(sqlQuery, [id])
        return result.rows[0]
        
    }
}


module.exports = userDataMapper;