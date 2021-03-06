var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var helper = require('../helpers/helper');
process.env.JwtSecretKey = helper.Constants.JwtSecretKey;
//validation middleware
module.exports.authenticate= function (req, res, next){
    var token = req.body.token || req.headers['token'];
    if (token) {
        jwt.verify(token, process.env.JwtSecretKey, function (err, ress) {
            if (err) {
                res.status(500).send(helper.MSG_LIST.Invalid_Token);
            } else {
                req.decoded = ress;
                next();
            }
        })
    } else {
        res.send(helper.MSG_LIST.Invalid_Token);
    }
}