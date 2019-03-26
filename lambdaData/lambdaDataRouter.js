const router = require("express").Router();
const knex = require("knex"); // Step 1: Bring in the knexjs library

const knexConfig = {
    // Step 2: Configure the knexjs library to connect to 
    // './data/lambda.sqlite3' using sqlite3 module
    client: "sqlite3", // this is the driver
    useNullAsDefault: true,
    connection: {
      filename: "./data/lambda.sqlite3"
    },
    // debug: true
};

const db = knex(knexConfig); // Step 3: Set the 'knex(knexConfig)' to a variable called 'db'

router.get("/", (req, res) => {
    // Step 4: Use the proper syntax from knexjs.org to select and return all records from the table
});

module.exports = router;