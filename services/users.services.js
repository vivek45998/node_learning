const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const { response } = require("express");
const utilsConfig = require("../utils/utils.config");

async function login({ username, password }, callback) {
  const user = await User.findOne({ username });
  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = auth.generateAccessToken(username);
      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({ message: utilsConfig.invalidUser });
    }
  } else {
    return callback({ message: utilsConfig.invalidUser });
  }
}

async function register(data, callback) {
  if (data.username == undefined) {
    return callback({ message:utilsConfig.userNameRequired});
  }
  const user = new User(data);
  user
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = { login, register };
