require("dotenv").config();

const cors                = require("cors");
const express             = require("express");
const conversationsRoutes = require("./routes/conversations");


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:['http://localhost:3000']
}))

app.use('/',conversationsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}`)
});

