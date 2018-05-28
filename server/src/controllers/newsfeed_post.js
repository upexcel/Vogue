import BaseAPIController from "./BaseAPIController";
import provideUser from "../providers/user";
import db from '../db.js'
export class newsfeed_postController extends BaseAPIController {

    createNewsfeedPost = (req, res, next) => {
        db.newsfeed_post.create(req.body).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

    getNewsfeedPost = (req, res, next) => {
        let finalData = []
        db.newsfeed_post.count({}).then((count) => {
            db.newsfeed_post.findAll({ limit: parseInt(req.params.limit), offset: parseInt(req.params.limit) * parseInt(req.params.page - 1) }).then((data) => {
                data = JSON.parse(JSON.stringify(data));
                getUserData(data, function(resp) {
                    res.json({ status: 1, data: resp, totalCount: count })
                })
            }, (err) => this.handleErrorResponse(res, err))
        })
        let getUserData = (data, callback) => {
            if (data.length) {
                let newsFeed = data.splice(0, 1)[0];
                db.users.findOne({ where: { id: newsFeed.userID } }).then((user) => {
                    newsFeed.userData = user;
                    finalData.push(newsFeed)
                    if (data.length) {
                        getUserData(data, callback)
                    } else {
                        callback(finalData)
                    }
                })
            } else {
                callback(finalData)
            }
        }
    }

    updateNewsfeedPost = (req, res, next) => {
        db.newsfeed_post.update(req.body, { where: { id: req.body.id } }).then((response) => {
            res.json({ status: 1, data: response })
        }, (err) => this.handleErrorResponse(res, err))
    }

    deleteNewsfeedPost = (req, res, next) => {
        db.newsfeed_post.destroy({ where: { id: req.params.id } }).then((response) => {
            res.json({ status: 1, data: response })
        }, (err) => this.handleErrorResponse(res, err))
    }

    NewsfeedPostwithProducts = (req, res, next) => {
        db.newsfeed_post.findOne({ where: { id: req.params.id } }).then((response) => {
            let products = [];
            products.push(response.product1ID, response.product2ID, response.product3ID, response.product4ID)

            db.products.findAll({ where: { ProductID: products } }).then((products) => {
                response = JSON.parse(JSON.stringify(response));
                response.products = products
                if (response.userID) {
                    db.users.findOne({ where: { id: response.userID } }).then((userData) => {
                        response.userData = userData
                        res.json({ status: 1, data: response })

                    })
                } else {
                    res.json({ status: 1, data: response })
                }
            })
        }, (err) => this.handleErrorResponse(res, err))
    }

}

const controller = new newsfeed_postController();
export default controller;