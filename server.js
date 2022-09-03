const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.get('/', (req, res) => {
    res.send("API running");
})

const PORT =  5001;

app.listen(PORT,() => {console.log(`listening on port ${PORT}`)});