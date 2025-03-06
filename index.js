const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const router = require("./routes/router.js");
app.use("/", router);


app.listen(3000,()=> {console.log("listening on port 3000");})
