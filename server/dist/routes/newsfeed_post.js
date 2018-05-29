"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newsfeed_post = require("../controllers/newsfeed_post");

var _newsfeed_post2 = _interopRequireDefault(_newsfeed_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

    /* Routes for newsfeed_post */

    app.route("/newsfeed_post/createNewsfeedPost").post(_newsfeed_post2.default.createNewsfeedPost);

    app.route("/newsfeed_post/getNewsfeedPost/:limit/:page").get(_newsfeed_post2.default.getNewsfeedPost);

    app.route("/newsfeed_post/updateNewsfeedPost").put(_newsfeed_post2.default.updateNewsfeedPost);

    app.route("/newsfeed_post/deleteNewsfeedPost/:id").delete(_newsfeed_post2.default.deleteNewsfeedPost);

    app.route("/newsfeed_post/NewsfeedPostwithProducts/:id").get(_newsfeed_post2.default.NewsfeedPostwithProducts);

    return app;
};
//# sourceMappingURL=newsfeed_post.js.map