const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
  const { name, email, password, usertype } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      name,
      email,
      password: hashedPassword,
      usertype,
    });
    user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.dataValues.token = token
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if(!user){
      return res.status(401).json({ error: "EMAIL_NOT_FOUND" });
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.dataValues.token = token
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'usertype']
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
