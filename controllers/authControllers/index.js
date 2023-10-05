const jwt = require("jsonwebtoken");
const User = require("../../databases/models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { generateJwtToken } = require("../../utils/jwtHelper");
dotenv.config();

const signupController = async (req, res) => {
  let { username, password,email } = req.body;

  console.log({ username, password });
  try {
    if (!username || !password) {
      return res.status(400).json({ error: "All input fields are required" });
    }

    const findUser = await User.findOne({ username });
    if (findUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    password = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password,
      email
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const authController = async (req, res) => {
  let { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: "All input fields are required" });
    }

    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({ error: "No user found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, findUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // const token = jwt.sign(
    //   { username, findUserId: findUser.id },
    //   process.env.SECRET_KEY,
    //   { expiresIn: "1h" }
    // );
    const token= generateJwtToken(  { username, findUserId: findUser.id },'24h')

    res.status(200).json({findUser,
      token,
      // _id: findUser.id,
      // username: findUser.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { authController, signupController };
