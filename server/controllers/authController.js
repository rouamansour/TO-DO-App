
const User = require('../models/User');
const { sign } = require("jsonwebtoken");

const createToken = (id, email) => {
  return sign({ id, email, max: 8 }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.signUp = async (req, res) => {
	try {
		const newUser = await User.create({
			...req.body,
			role: req.body.role === "admin" ? "user" : req.body.role,
		});
		 res.status(201).json({
            status:"success",
            data:{
                user:newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:error.message
        })
    }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required !!!",
      });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.isPassCorrect(password, user.password))) {
      return res.status(400).json({
        message: "Email or password are incorrect !!",
      });
    }
    const token = createToken(user._id, user.email);
    res.status(200).json({
      message: "Logged In !!!",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
