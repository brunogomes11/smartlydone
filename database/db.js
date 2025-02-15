//Make connection with Task Manager database
const pg = require("pg");
const fs = require("fs");

// imports the dotenv package to load enviormental variables from the .env
require("dotenv").config();

// creates an instance of the DB connection pool. Pool is a mechanism used to manage and efficiently reuse DB connections. It keeps the DB connection and is not necessary to open/close connection at each DB interaction
const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL, // for deployment on render.com
    user: "postgres", // for deployment on render.com
    // host: "localhost", // for running on the local machine
    // database: "task_manager", // for running on the local machine
    // password: process.env.DB_PASSWORD, // for running on the local machine
});

// !!!! Before running the code, make sure to enter in the terminal: CREATE DATABASE task_manager IF NOT EXISTS; !!!!
//
async function createTables() {
    try {
        const sql = fs.readFileSync(__dirname + "/schema.sql", "utf8");
        const client = await db.connect();
        await client.query(sql);
        client.release();
    } catch (err) {
        console.error("Error creating tables:", err);
        throw err; // Re-throw the error to handle it in the caller function
    }
}

//Export db to be use in other files
module.exports = { db, createTables };
