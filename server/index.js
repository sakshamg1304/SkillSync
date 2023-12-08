const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const adminRoute = require('./rotues/adminRoute');
const userRoute = require('./rotues/userRoute');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


//routes imports
app.use("/admin", adminRoute);
app.use("/user", userRoute);


// mongoDB connection 
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
    console.log(err);
    });



app.listen(3000, () => console.log('Server running on port 3000'));

