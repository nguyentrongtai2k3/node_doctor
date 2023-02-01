import db from "../models/index";
import bcrypt from "bcryptjs";
let handleUserLogin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUsername(username);
      if (isExist) {
        let user = await db.User.findOne({
          // attributes: ["email", "roleID", "password"],
          where: { email: username },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Login Successfully";
            userData.user = user;
            delete user.password;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password. Please try again";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User doesn't existed";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Your Email is invalid. Try again";
      }
      resolve(userData);
    } catch (error) {
      error.reject;
    }
  });
};
let checkUsername = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: username },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      e.reject;
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "abcd";
      if (userId === "ALL") {
        users = db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
};
