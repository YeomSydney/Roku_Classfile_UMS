const express = require('express');
const router = express.Router();
const sql = require('mysql');
const creds = require('../config/user');

// Create the sql connection pool
var pool  = sql.createPool(creds);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.json({ message: 'Hit the main ums route.' });
})

// try our login route - set it up and send back a message
router.post('/login', (req, res) => {
    console.log('Hit the login route.');
    console.log(req.body);

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        
        // Use the connection to validate that this user exists in the database
        connection.query(`SELECT username, password FROM users WHERE username="${req.body.username}"`, function (error, results) {
            // When done with the connection, release it.
            connection.release();
            
            // Handle error after the release.
            if (error) throw error;
            console.log('the user data:', results, results.length);

            if (results.length == 0) {
                // user doesn't exist
                res.json({message: 'no user'});
            } else if (results[0].password !== req.body.password) {
                // wrong password, send back an error message
                // "message: 'wrong password' or 'success'" should match to "if (data.message == 'success')" in the frontend file - 'TheLoginComponent' file.
                res.json({message: 'wrong password'})
            } else {
                res.json({message: 'success', user: results[0]});
            }
        });
    });
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

                if (user.avatar == "default") {
                    user.avatar = 'temp_avatar.jpg'
                }
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