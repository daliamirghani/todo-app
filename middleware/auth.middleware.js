const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userData= require("../modules/users.modules.js");

const doubleAuth = async (req,res,next)=>{ //both authentication and authorization
const token = req.cookies.token;
if (!token)
{
    return res.status(401).json({
        status: 401,
        msg: "Unauthorized access!"
    })
}
let decoded= jwt.verify(token, "task9");
if (!decoded)
{
     return res.status(401).json({
        status: 401,
        msg: "Unauthorized access!"
})
}

try {
    const userObj = await userData.findById(decoded.userId).select("-password");
    if (!userObj)
 {
    return res.status(404).json({
        status: 404,
        msg: "User not found!"})
 }
 req.userId = decoded.userId;//only sends it after it ensures the user exists
 next();
}
catch (error) {
    return res.status(500).json({
        status: 500,
        msg: "Error loading user data!"
})
}
}

module.exports= doubleAuth;