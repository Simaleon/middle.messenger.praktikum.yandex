const express = require('express');

const app = express(),
    PORT = process.env.PORT || 3000;    // set PORT=4000 && <script> in package.json

app.use(express.static('./dist'));

app.listen(PORT, function () {
    console.log(`Nodejs is listening on port ${PORT}!`);
});
