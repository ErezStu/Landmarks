const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register

router.post("/register", async (req, res) => {
  try {
    // generate the passwrod
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //Save the user

    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json("error: " + err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    //Find the user
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("The email or password are not correct");
    // Validate the password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validatePassword &&
      res.status(400).json("The email or password are not correct");
    res
      .status(200)
      .json({ _id: user._id, email: user.email, username: user.username });
  } catch (err) {
    res.status(500).json("error: " + err);
  }
});

module.exports = router;
