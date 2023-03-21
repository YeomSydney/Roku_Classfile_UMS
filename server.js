const express = require('express');
const app = express();

const port = process.env.PORT || 5050;

// this bit of config enables our express app to read incoming data payloads.
// via our routes - the user data we pass in via the fetch call in the login component.
// we can use a JSON encoded object or URL parameters/form data to pass our user data in.
// Move them to api.js with "router" instead of "app":
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use('/ums', require('./routes/api'));

app.listen(port, () => {
    console.log(`ums is running at port ${port}`);
})