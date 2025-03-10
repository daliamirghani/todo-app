const express = require("express");
const db = require("./db/connectDB.js")
const cookieParser = require("cookie-parser");
const app = express();

const port = 3000;
app.use(express.json());
app.use(cookieParser());

const router = require("./routes/router.js");
const authRouter = require("./routes/auth.router.js");

app.use("/", router);
app.use("/", authRouter);


app.listen(3000,async()=> {console.log("listening on port 3000");
    try
   { await db.connectDB();
    console.log("Sucessfuly connected to the database!");
   }
   catch (error)
   {console.log("Error connecting to the database!");}
})

