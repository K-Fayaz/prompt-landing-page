const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");
const User   = require("../model/user");


// Access Env's
const SALT_ROUNDS = 10;
const SECRET      = process.env.SECRET;


const signUp = async (req,res)=>{
    try{
        let { name, email, password } = req.body;

        // check if there is a user for this email
        let user = await User.findOne({email});
        if (user) {
            res.status(400).json({
                success: false,
                message:"User exists with this email"
            });
            return;
        }

        // Create User
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await User.create({ username:name, email:email , password:hashedPassword});

        // Create Token
        let payload = { id: newUser._id };
        let token   = jwt.sign(payload,SECRET,{
            expiresIn: '24h'
        });

        res.status(201).json({
                success: true,
                token
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: false,
            message:"Something went wrong"
        })
    }
}



module.exports = {
    signUp,
}