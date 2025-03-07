const userData= require("../modules/users.modules.js");

const signup = async (req, res) => {
 try {   const input = req.body;
   await  userData.create(input)
    res.status(201).json({
        "success": true,
        "message": "User registered successfully"
      })}
catch (error)
{res.status(500).json({
    "success": false,
    "message": "Error registering user"
  })}
};
const signin = async (req, res) => {};
const signout = async (req, res) => {};

module.exports =
{signup,
signin,
signout,
}