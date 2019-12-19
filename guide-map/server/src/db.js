console.log("Inside db.js")

const monk = require('monk');

const db = monk(process.env.DATABASE_URL);

module.exports = db;
