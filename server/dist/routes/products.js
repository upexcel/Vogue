"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _products = require("../controllers/products");

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

    /* Routes for products */

    app.route("/products/createProducts").post(_products2.default.createProducts);

    app.route("/products/getProducts").get(_products2.default.getProducts);

    app.route("/products/searchProducts/:productID").get(_products2.default.searchProducts);

    return app;
};
//# sourceMappingURL=products.js.map