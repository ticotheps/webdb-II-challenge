const router = require("express").Router();
const knex = require("knex"); // Step 1: Bring in the knexjs library

const knexConfig = {
    // Step 2: Configure the knexjs library to connect to 
    // './data/lambda.sqlite3' using sqlite3 module
    client: "sqlite3", // this is the driver
    useNullAsDefault: true,
    connection: {
      filename: "./data/zoos.db3",
    },
    debug: true
};

const db = knex(knexConfig); // Step 3: Set the 'knex(knexConfig)' to a variable called 'db'

router.get("/", (req, res) => {
    db("zoos")
        .then(zoos => {
            res.status(200).json(zoos);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get("/:id", (req, res) => {
    const zooId = req.params.id;
    // const { id } = req.params;

    // retrieves a zoo by its id
    db("zoos")
        .where({ id: zooId})
        .first() // this makes sure to only return the FIRST matching element
        .then(zoo => {
            res.status(500).json(zoo);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post("/", (req, res) => {
    db("zoos")
        .insert(req.body)
        .then(ids => {
            const id = ids[0];

            db("zoos")
                .where({ id })
                .first()
                .then(zoo => {
                    res.status(201).json(zoo);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

module.exports = router;