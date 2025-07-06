const express = require('express');
const app = express()
const dotenv = require('dotenv').config();
const cors = require('cors');
const recipe = require('./routes/recipe');
const user = require('./routes/user')
const connectDb = require('./config/connectionDb');


const PORT = process.env.PORT || 3000;
connectDb();
app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));
app.use("/", user);
app.use("/recipe", recipe);


app.listen(PORT, (err) => {
    console.log(`app is listing on port ${PORT}`);
});