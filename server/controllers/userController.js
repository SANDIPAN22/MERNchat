const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username is already exists.", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email is already present", status: false });
    }

    // register process
    console.log("Inside the Register Processsssssss...................");
    const hashedPassword = await bcrypt.hash(password, 11);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    user.password = undefined;
    return res.json({ status: true, user });
  } catch (err) {
    console.error("Register:: ", err);
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Login Failed!", status: false });
    }
    const pswValidation = await bcrypt.compare(password, user.password);
    if (!pswValidation) {
      return res.json({ msg: "Login Failed!", status: false });
    }
    user.password = undefined;
    return res.json({ status: true, user });
  } catch (err) {
    console.error("LOGIN:: ", err);
    next(err);
  }
};
