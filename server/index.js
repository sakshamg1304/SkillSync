import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors);
app.use(json);

//routes imports
app.use("/admin",adminRoute);
app.use("/user",userRoute);


// mpngoDB connection 
connect()



app.listen(3000, () => console.log('Server running on port 3000'));

