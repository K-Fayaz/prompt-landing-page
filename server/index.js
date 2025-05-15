require("dotenv").config();
require("./model/")

const cors                = require("cors");
const express             = require("express");
const authRoutes          = require("./routes/auth");
const conversationsRoutes = require("./routes/conversations");


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:[
        'http://localhost:5173',
        'http://localhost:8080'
    ]
}))

app.use('/auth',authRoutes);
app.use('/',conversationsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}`)
});

