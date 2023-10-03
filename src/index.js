const  express = require('express');
const {DatabaseConnection} = require('./db/connection');
const {Students} = require('./models/students');
const app = express();
const PORT = process.env.PORT || 3000

// Database connection Start
DatabaseConnection();
// Database connection End

// Create the data into the database newly
app.use('/', async (req,res,next) => {
    const data = await Students.find();
    console.log(data);
    next();
});
app.post('/new', async (req,res) => {
    try {
        await Students.insertMany([req.body]);
    } catch (error) {
        console.log(error);
    }
});
// get the data into the database all over the data
app.get('/',async(req,res) => {
   res.status(200).send('Success!');
});

// application are listening no port number 3000
app.listen(PORT,() => {
    console.log(`listening on http://localhost:${PORT}`);
});