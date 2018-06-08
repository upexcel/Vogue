import BaseAPIController from "./BaseAPIController";
import provideUser from "../providers/user";
import db from '../db.js';
import _ from "lodash";
import formidable from "formidable";
import fs from "fs";
import csvjson from "csvjson";
import path from "path";
var to_json = require('xmljson').to_json;
var x2j = require('xml2js');

export class UserController extends BaseAPIController {

    createProducts = (req, res, next) => {
        var arrToDelete = []
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (files.file) {
                if (files.file['name'].substr(files.file['name'].lastIndexOf('.') + 1).toLowerCase() != 'xml') {
                    res.status(400).json({ error: 1, message: "please upload csv file" })
                } else {
                    db.products.findAll({}).then((resp) => {
                        fs.readFile(files.file.path, function(err, data) {
                            let xml = data.toString('utf8')
                            to_json(xml, function(error, data) {
                                if (error) {
                                    res.status(400).json({ error: 1, message: "something is wrong in your xml file", data: error })
                                } else {
                                    let products = data.Products.Product
                                    let arr = [];
                                    arrayOfJson(products, arr, function(jsonArray) {
                                        let arrToDelete = []
                                        _.map(resp, (val, key) => {
                                            let findProduct = _.find(jsonArray, function(get) { return get.ProductID == val.ProductID; });
                                            if (!findProduct) {
                                                arrToDelete.push(val.ProductID)
                                            }
                                            if (key == resp.length - 1) {
                                                db.products.destroy({ where: { ProductID: arrToDelete } }).then((data) => {
                                                    console.log(data, "deleted")
                                                })
                                            }
                                        })
                                        indertUpdateProducts(jsonArray, function(finalResponse) {
                                            res.json({ status: 1, message: finalResponse })
                                        })
                                    })
                                }
                            });
                        })
                    })
                }
            } else {
                res.status(400).json({ error: 1, message: "file not recieved" })
            }
        })

        function arrayOfJson(products, jsonArray, callback) {
            if (Object.keys(products).length) {
                for (var x in products) {
                    products[x].Colour1 = products[x].colors.Colour1;
                    products[x].Colour2 = products[x].colors.Colour2;
                    products[x].Colour3 = products[x].colors.Colour3;
                    products[x].Subcategory = products[x].subcategories.Subcategory['1'];
                    jsonArray.push(products[x]);
                    if (x == Object.keys(products).length - 1) {

                        callback(jsonArray)
                    }
                }
            } else {
                callback(jsonArray)
            }
        }

        function indertUpdateProducts(data, callback) {
            if (data.length) {
                let val = data.splice(0, 1)[0];
                if (val.ProductID) {
                    db.products.findOne({ where: { ProductID: val.ProductID } }).then((product) => {
                        if (product) {
                            db.products.update(val, { where: { ProductID: val.ProductID } }).then((data) => {})
                        } else {
                            db.products.create(val).then((data) => {})
                        }
                    })
                } else {
                    console.log("productID not exist")
                }
                if (data.length) {
                    indertUpdateProducts(data, callback)
                } else {
                    callback("success")
                }
            } else {
                callback(data)
            }
        }
    }

    getProducts = (req, res, next) => {
        db.products.findAll({}).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

    searchProducts = (req, res, next) => {
        db.products.findAll({ where: { productID: { $like: '%' + req.params.productID + '%' } } }).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

}

const controller = new UserController();
export default controller;