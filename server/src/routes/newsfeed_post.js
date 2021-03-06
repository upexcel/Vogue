import newsfeed_post from "../controllers/newsfeed_post";

export default (app) => {

    /* Routes for newsfeed_post */

    app.route("/newsfeed_post/createNewsfeedPost").post(newsfeed_post.createNewsfeedPost);

    app.route("/newsfeed_post/getNewsfeedPost/:limit/:page").get(newsfeed_post.getNewsfeedPost);

    app.route("/newsfeed_post/updateNewsfeedPost").put(newsfeed_post.updateNewsfeedPost);

    app.route("/newsfeed_post/deleteNewsfeedPost/:id").delete(newsfeed_post.deleteNewsfeedPost);

    app.route("/newsfeed_post/NewsfeedPostwithProducts/:id").get(newsfeed_post.NewsfeedPostwithProducts);

    return app;
};