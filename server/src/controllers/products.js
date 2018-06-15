import BaseAPIController from "./BaseAPIController";
import provideUser from "../providers/user";
import db from '../db.js';
import _ from "lodash";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export class UserController extends BaseAPIController {

    createProducts = (req, res, next) => {
        var arrToDelete = []
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (files.file) {
                if (files.file['name'].substr(files.file['name'].lastIndexOf('.') + 1).toLowerCase() != 'tsv') {
                    res.status(400).json({ error: 1, message: "please upload csv file" })
                } else {
                    db.products.findAll({}).then((resp) => {
                        fs.readFile(files.file.path, function(err, data) {
                            let tsv = data.toString('utf8')
                            arrayOfJson(tsv, function(jsonArray) {
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
                        })
                    })
                }
            } else {
                res.status(400).json({ error: 1, message: "file not recieved" })
            }
        })

        function arrayOfJson(tsv, callback) {
            var lines = tsv.replace(/\r/g, "").split('\n');
            var result = [];
            var headers = lines[0].split("\t");
            for (var i = 1; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i].split("\t");
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            callback(result)
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