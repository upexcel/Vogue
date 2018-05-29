'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserController = undefined;

var _BaseAPIController2 = require('./BaseAPIController');

var _BaseAPIController3 = _interopRequireDefault(_BaseAPIController2);

var _db = require('../db.js');

var _db2 = _interopRequireDefault(_db);

var _admZip = require('adm-zip');

var _admZip2 = _interopRequireDefault(_admZip);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _formidable = require('formidable');

var _formidable2 = _interopRequireDefault(_formidable);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_cloudinary2.default.config({
    cloud_name: 'dtgbbrxs0',
    api_key: '296789734731114',
    api_secret: 'FNqRNKXgicTjVfaEj39DjsDDBEY'
});

var UserController = exports.UserController = function (_BaseAPIController) {
    _inherits(UserController, _BaseAPIController);

    function UserController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, UserController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserController.__proto__ || Object.getPrototypeOf(UserController)).call.apply(_ref, [this].concat(args))), _this), _this.uploadImage = function (req, res, next) {
            var finalImageUrls = [];
            var errors = [];
            var form = new _formidable2.default.IncomingForm();
            form.parse(req, function (err, fields, files) {

                if (files.file) {
                    if (files.file['name'].substr(files.file['name'].lastIndexOf('.') + 1).toLowerCase() != 'zip') {
                        res.status(400).json({ error: 1, message: "please upload zip file" });
                    } else {
                        _fs2.default.readFile(files.file.path, function (err, data) {
                            var myDir = __dirname + "/files";
                            if (!_fs2.default.existsSync(myDir)) {
                                _fs2.default.mkdirSync(myDir);
                            }
                            var directory = '';
                            var zip = new _admZip2.default(data);
                            var zipEntries = zip.getEntries();
                            zip.extractAllTo(myDir, true);
                            var productIDS = [];
                            zipEntries.forEach(function (zipEntry, key) {
                                var imageFlag = false;
                                if (!zipEntry.isDirectory) {
                                    if (zipEntry.name) {
                                        var productID = zipEntry.name.split(".");
                                        productIDS.push({ Pid: productID[0], entry: zipEntry.entryName });
                                    }
                                } else {
                                    directory = zipEntry.entryName;
                                }
                            });
                            var validImages = [];
                            var errors = [];
                            _db2.default.products.findAll({}).then(function (product) {
                                _lodash2.default.map(product, function (val, key) {
                                    _lodash2.default.filter(productIDS, function (index) {
                                        // console.log(index, val.ProductID, "kokokoko")
                                        if (index.Pid == val.ProductID) {
                                            validImages.push(index);
                                        }
                                    });
                                });
                                _lodash2.default.map(product, function (val, key) {
                                    _lodash2.default.remove(productIDS, function (index) {
                                        return index.Pid == val.ProductID;
                                    });
                                });

                                cloudImageUrls(validImages, directory, function (final_response) {
                                    res.json({ status: 1, data: final_response, errors: productIDS });
                                });

                                function cloudImageUrls(validImages, directory, callback) {
                                    if (validImages.length) {
                                        var image = validImages.splice(0, 1)[0];
                                        var imageUrl = 'http://' + req.hostname + ':5001/controllers/files/' + image.entry;
                                        _cloudinary2.default.uploader.upload(imageUrl, function (result) {
                                            console.log(result.url);
                                            if (result) {
                                                finalImageUrls.push({ imageUrl: result.url, ProductId: image.Pid });
                                                _db2.default.products.update({ ImageFullsizeURL: result.url }, { where: { productID: image.Pid } }).then(function (updatedImages) {
                                                    console.log(updatedImages);
                                                });
                                                if (validImages.length) {
                                                    cloudImageUrls(validImages, directory, callback);
                                                } else {
                                                    callback(finalImageUrls);
                                                }
                                            }
                                            //     //     rmdir(myDir + '/' + directory, function(error, data) {
                                            //     //         console.log(err)
                                            //     //     });
                                            // }
                                        });
                                    } else {
                                        callback(finalImageUrls);
                                    }
                                }
                            });
                        });
                    }
                } else {
                    res.status(400).json({ error: 1, message: "file not recieved" });
                }
            });
        }, _this.uploadMp4 = function (req, res, next) {
            var form = new _formidable2.default.IncomingForm();
            form.parse(req, function (err, fields, files) {
                if (files.file) {
                    if (files.file['name'].substr(files.file['name'].lastIndexOf('.') + 1).toLowerCase() != 'mp4') {
                        res.status(400).json({ error: 1, message: "please upload mp4 file" });
                    } else {
                        _fs2.default.readFile(files.file.path, function (err, data) {
                            var myDir = __dirname + "/files";
                            if (!_fs2.default.existsSync(myDir)) {
                                _fs2.default.mkdirSync(myDir);
                            }
                            _fs2.default.writeFile(myDir + ('/' + files.file.name), data, function (err, resp) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    var mp4Url = 'http://' + req.hostname + ':5001/controllers/files/' + files.file.name;
                                    _cloudinary2.default.v2.uploader.upload(mp4Url, { resource_type: "video" }, function (error, result) {
                                        var _this2 = this;

                                        if (err) {
                                            res.status(400).json({ error: 1, data: err });
                                        } else {
                                            console.log(result.url);
                                            var resultData = {
                                                "cloudUrl": result.url
                                            };
                                            _db2.default.mp4Files.create(resultData).then(function (final_resp) {
                                                res.json({ status: 1, data: final_resp });
                                            }, function (err) {
                                                return _this2.handleErrorResponse(res, err);
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    }
                }
            });
        }, _this.getMp4 = function (req, res, next) {
            _db2.default.mp4Files.findAll({}).then(function (data) {
                res.json({ status: 1, data: data });
            }, function (err) {
                return _this.handleErrorResponse(res, err);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return UserController;
}(_BaseAPIController3.default);

var controller = new UserController();
exports.default = controller;
//# sourceMappingURL=imageProcess.js.map