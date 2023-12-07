import jwt from 'jsonwebtoken';
const dotenv = require("dotenv");

dotenv.config();

const authenticateJWT = (req,res,next) =>{
    const authHeader = req.body.authorization;
    if(authHeader){
        const token = authHeader.split('')[1];
        jwt.verify(token,process.env.SECRET, (err,user) => {
            if(err) {
                res.status(403).json();
            }
            req.user = user;
            next();
        });   
    } else {
        res.status(401).json();
     }
};

export default authenticateJWT;