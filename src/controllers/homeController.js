import db from "../models/index";
import user from "../models/user";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, resp) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return resp.render("tables.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};
let getCRUD = async (req, resp) => {
  return resp.render("crud.ejs", {
    dataUser: [],
    pageMethod: "post-crud",
  });
};
let postCRUD = async (req, resp) => {
  let message = await CRUDService.createNewUser(req.body);
  let data_users = await CRUDService.getData();
  console.log(message);
  console.log(req.body);
  // return resp.render("UserData.ejs");
  return resp.render("UserData.ejs", {
    dataTable: data_users,
  });
};
let getUserData = async (req, resp) => {
  let data_users = await CRUDService.getData();
  return resp.render("UserData.ejs", {
    dataTable: data_users,
  });
};
let getEditUdata = async (req, resp) => {
  console.log(req.query.id);
  let userID = req.query.id;
  if (userID) {
    let user_data = await CRUDService.getUserDataByID(userID);
    return resp.render("crud.ejs", {
      dataUser: user_data,
      pageMethod: "edit_user_data",
    });
  } else return resp.render("crud.ejs");
};
let postEditUdata = async (req, resp) => {
  let user_data = req.body;
  await CRUDService.postEditUdata(user_data);
  console.log(user_data);
  return resp.send("/user-data");
};
let deleteUserData = async (req, resp) => {
  let id = req.query.id;
  await CRUDService.deleteUserData(id);
  return resp.send("delete done");
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  getUserData: getUserData,
  getEditUdata: getEditUdata,
  postEditUdata: postEditUdata,
  deleteUserData: deleteUserData,
};
