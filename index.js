const express = require("express");
const db = require("./db/connectDB.js")
const app = express();

const port = 3000;
app.use(express.json());

const router = require("./routes/router.js");
const authrouter = require("./routes/authrouter.js");

app.use("/", router);
app.use("/", authrouter);


app.listen(3000,async()=> {console.log("listening on port 3000");
    try
   { await db.connectDB();
    console.log("Sucessfuly connected to the database!");
   }
   catch (error)
   {console.log("Error connecting to the database!");}
})

