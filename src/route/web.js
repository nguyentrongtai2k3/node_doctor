import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/home", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/user-data", homeController.getUserData);
  router.get("/edit_udata", homeController.getEditUdata);
  router.post("/edit_user_data", homeController.postEditUdata);
  router.get("/delete_udata", homeController.deleteUserData);
  router.post("/api/get-all-users", userController.handleGetAllUser);
  router.post("/api/login", userController.handleLogin);

  return app.use("/", router);
};
module.exports = initWebRoutes;
