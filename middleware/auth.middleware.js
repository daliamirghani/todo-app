const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userData= require("../modules/users.modules.js");
const helper = require("../helper-functions/helper.js")// bc i want filterTodos

const authenticator = async (req,res,next)=>{
const token = req.cookies.token;
if (!token)
{
    return res.status(401).json({
        status: 401,
        msg: "Token doesn't exist!"
    })
}
let decoded= jwt.verify(token, "task9");
if (!decoded)
{
     return res.status(401).json({
        status: 401,
        msg: "Unauthorized access- Unverified Token!"
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
const authorizor = async (req,res, next)=>{
const requestId = req.params.id;
try {
    const todoList = await helper.filterTodos(req.userId);
    const match = todoList.filter(todo=> todo.id.toString() === requestId); //to see if req param belongs to current user
    if ((match.length === 0))
     {
        return res.status(403).json({
            status: 403,
            msg: "Permission denied!"
        })
     } 
    next();
}
    catch (error)
     {res.status(500).json({
      status: 500,
      msg: "Error authorizing access"
})}
}
module.exports = {
    authenticator,
    authorizor
};
