import db from "../models/index";
var bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let passwordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: passwordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender,
        roleid: data.role,
        phone: data.phone,
        positionID: "",
        image: "",
      });
      console.log(data);
      console.log("hashPass:" + passwordFromBcrypt);
      resolve("create success");
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
let getData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({ raw: true });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserDataByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findByPk(id);
      if (user) {
        resolve(user);
      } else resolve("No user found");
    } catch (error) {
      reject(error);
    }
  });
};
let postEditUdata = (data) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findByPk(data.id);
    let passwordFromBcrypt = await hashUserPassword(data.password);
    try {
      if (user) {
        (user.email = data.email),
          (user.password = passwordFromBcrypt),
          (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address),
          (user.gender = data.gender),
          (user.roleid = data.role),
          (user.phone = data.phone),
          (user.positionID = ""),
          (user.image = "");
        await user.save();
        resolve();
      } else {
        resolve(user);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserData = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findByPk(id);
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getData: getData,
  getUserDataByID: getUserDataByID,
  postEditUdata: postEditUdata,
  deleteUserData: deleteUserData,
};
