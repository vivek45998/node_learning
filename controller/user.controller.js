const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const userService = require("../services/users.services");
const utilsConfig = require("../utils/utils.config");
exports.register = (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  //when the user register first thing we utilize bcryptjs to encrypt the password
  //salt create the unique password even the instant of two user selct same password
  //here just hashing the our password
  req.body.password = bcrypt.hashSync(password, salt);
  userService.register(req.body, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: utilsConfig.success,
      data: result,
    });
  });
};

exports.login = (req, res, next) => {
  const { email, username, password } = req.body;
  userService.login({ email, username, password }, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({ message: "Success", userProfile: result });
  });
};
/// after user login genrate  a token when we access this api
///the token is verified then genrate response Authorised user
exports.userProfile = (req, res, next) => {
  User.find({}).then((user) => {
    res.status(200).send(user);
  });
};

exports.updateUser = (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(password, salt);
  User.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (user) {
    User.findOne({ _id: req.params.id }).then(function (user) {
      res.send(user);
    });
  });
};

exports.deleteUser = (req, res, next) => {
  console.log(req.params.id);
  User.findOneAndDelete({ _id: req.params.id }).then(function (user) {
    res.send(user);
  });
};
