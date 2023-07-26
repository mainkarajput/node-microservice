const express = require("express");
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 7070;
require('./Connection/mongoConnection')
const routes = require('./routes')

app.use(express.json());
app.use('/auth', routes)
app.listen(PORT, () => {
    console.log(`Auth-Service running at http://localhost:${PORT}`);
});
