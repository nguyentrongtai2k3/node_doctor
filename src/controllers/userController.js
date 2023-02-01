import userService from "../services/userService";
const user = require("../models/user");

let handleLogin = async (req, resp) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    return resp.status(500).json({
      errCode: 1,
      message: " Username or Password is invalid",
    });
  }
  console.log(password);
  let userData = await userService.handleUserLogin(username, password);
  return resp.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUser = async (req, resp) => {
  let id = req.body.id; //ALL,id
  let users = await userService.getAllUsers(id);
  if (!id) {
    return resp.status(200).json({
      errCode: 1,
      errMessage: "Missing user id",
      users: [],
    });
  }
  return resp.status(200).json({
    errCode: 0,
    errMessage: "Get users done",
    users,
  });
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
};
