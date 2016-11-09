const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String, // 学号
  password: String,
  phone: String,  // 手机号
  academy: String,  // 自动填入
  classname: String,  // 自动填入
  realname: String, // 自动填入
  grade: Number,
  major: String,
  signUpDepartment: [String], // 报名的部门
  joinedDepartment: [String],   // 已加入的部门
  premission: String,
  status: String
});

const User = mongoose.model('User', UserSchema);

exports.createUser = function(userInfo) {
  console.log(userInfo);
  return new User(userInfo).save();
};

exports.findUser = function(query) {
  return User.findOne(query).exec();
};

exports.findUsers = function(query) {
  return User.find(query).exec();
};

exports.updateUser = function(query, data) {
  return User.findOneAndUpdate(query, data).exec();
};

exports.updateUsers = function(query, data) {
  return User.update(query, data).exec();
};