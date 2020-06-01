/** THIS IS WHERE WE WILL WRITE OUR SERVER CODE */
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('API is running!');
});