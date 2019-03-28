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
    db("bears")
        .then(bears => {
            res.status(200).json(bears);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get("/:id", (req, res) => {
    const bearId = req.params.id;
    // const { id } = req.params;

    // retrieves a bear by its id
    db("bears")
        .where({ id: bearId})
        .first() // this makes sure to only return the FIRST matching element
        .then(bear => {
            res.status(500).json(bear);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post("/", (req, res) => {
    db("bears")
        .insert(req.body)
        .then(ids => {
            const id = ids[0];

            db("bears")
                .where({ id })
                .first()
                .then(bear => {
                    res.status(201).json(bear);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.put("/:id", (req, res) => {
    db("bears")
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: "Specified bear was not found" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete("/:id", (req, res) => {
    db("bears")
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "Specified bear could not be found" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;