const express = require('express');
const app = express();

const port = process.env.PORT || 5050;

app.use('/ums', require('./routes/api'));

app.listen(port, () => {
    console.log(`ums is running at port ${port}`);
})