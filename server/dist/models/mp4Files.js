"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var mp4Files = sequelize.define("mp4Files", {
        cloudUrl: DataTypes.STRING
    }, {
        freezeTableName: true

    });
    return mp4Files;
};
//# sourceMappingURL=mp4Files.js.map