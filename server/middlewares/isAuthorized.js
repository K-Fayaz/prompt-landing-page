const jwt  = require("jsonwebtoken");
const User = require("../model/user");

const SECRET = process.env.SECRET;

const isAuthorized = async (req,res,next)=>{
    try{
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ status: false,message:"You need to login first" });
        }

        const token = authorization.split(' ')[1];

        let isValid = jwt.verify(token,SECRET);

        if (!isValid){
            return res.status(401).json({ status: false,message:"You need to login first" });
        }

        // Proceed with next operation
        next();

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: false,
            message:"Something went wrong"
        })
    }
}

module.exports = isAuthorized;