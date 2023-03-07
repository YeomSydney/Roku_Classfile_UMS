const express = require('express');
const router = express.Router();
const sql = require('mysql');
const creds = require('../config/user');

// Create the sql connection pool
var pool  = sql.createPool(creds);

router.get('/', (req, res) => {
    res.json({ message: 'Hit the main ums route.' });
})

// Get all users
router.get('/users', (req, res) => {
    // try to query the database and get all of the users.

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        
        // Use the connection
        connection.query('SELECT * FROM users', function (error, results) {
            // When done with the connection, release it.
            connection.release();
            
            // Handle error after the release.
            if (error) throw error;

            results.forEach(user => {
                delete user.fname;
                delete user.lname;
                delete user.password;
            })
            
            // Don't use the connection here, it has been returned to the pool.
            res.json(results);
        });
    });
    // End pool query.
})

// Get one user with this route
router.get('/users/:user', (req, res) => {
    // try to query the database and get all of the users.
    // this is the user ID:
    console.log(req.params.user);

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        
        // Use the connection
        connection.query(`SELECT * FROM users WHERE id=${req.params.user}`, function (error, results) {
            // When done with the connection, release it.
            connection.release();
            
            // Handle error after the release.
            if (error) throw error;
            console.log(results);
            
            // Don't use the connection here, it has been returned to the pool.
            res.json(results);
        });
    });
    // End pool query.
})

module.exports = router;