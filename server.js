const express = require('express');

const app = express(),
    PORT = 3000;

app.use(express.static('./dist'));

app.listen(PORT, function () {
    console.log(`Nodejs is listening on port ${PORT}!`);
});