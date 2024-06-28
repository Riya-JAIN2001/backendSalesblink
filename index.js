const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/userRoute.js');
const {Connect} = require('./Db/connect.js');
const sendEmailRoute = require('./routes/sendEmailRoute.js');
dotenv.config();
const corsOptions={
    origin:true,
    credentials:true
}

const app = express();
app.use(express.json());
app.get("/", (req,res)=>{
    return res.send("working")
});

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/users",userRoute );
app.use("/api/emails",sendEmailRoute);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  Connect()
  console.log(`Server running on port ${PORT}`);
});
module.exports= app;
