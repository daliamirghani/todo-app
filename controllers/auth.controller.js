const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const userData= require("../modules/users.modules.js");

const signup = async (req, res) => {
    try {
      const input = req.body;
      input.password = await bcrypt.hash(input.password, saltRounds);
      const used = await userData.findOne({username:input.username}); //no duplicates
      if (used)
      {
        return res.status(409).json({
          "status": 409,
          "msg": "Username already taken! Please choose another one."
      });
      }
      await userData.create(input);
      res.status(201).json({
        "success": true,
        "message": "User registered successfully"
      });
    } catch (error) {
      res.status(500).json({
        "success": false,
        "message": "Error registering user"
      });
    }
  };
const signin = async (req, res) => {
    try {
      const input = req.body;
      const user = await userData.findOne({ email: input.email });
      
      if (user) {
        const match = await bcrypt.compare(input.password, user.password);
        
        if (match) {
          const jwtToken = jwt.sign({ userId: user._id }, "task9", {
            expiresIn: "1h",
          });
          
          res.cookie("token", jwtToken, {
            httpOnly: true,
            maxAge: 3600000,
          });
          
          return res.status(200).json({
            "success": true,
            "user": {
              "id": user._id,
              "username": user.username,
              "email": user.email
            }
          });
        }
      }
      
      // Single error response for both invalid email or password
      return res.status(400).json({
        status: 400,
        msg: "invalid email or password",
      });
      
    } catch (error) {
      res.status(500).json({
        status: 500,
        msg: "Server Error",
      });
    }
  };
const signout = async (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({
        "success": true,
        "message": "User signed out successfully"
      })
};

module.exports =
{signup,
signin,
signout,
}