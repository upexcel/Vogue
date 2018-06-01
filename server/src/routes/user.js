import user from "../controllers/user";

export default (app) => {

    /* Routes for user */

    app.route("/user/createUser").post(user.createUser);

    app.route("/user/getAllusers").get(user.getAllusers);

    app.route("/user/updateUser").post(user.updateUser);

    app.route("/user/deleteUser/:id").post(user.deleteUser);

    app.route("/user/getUserById/:id").get(user.getUserById);

    return app;
};