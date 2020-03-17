var database = require('./../services/login');
var url = require('url');
var helper = require('../helpers/helper');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fs = require('fs');
const log = require('node-file-logger');
const options = {
    timeZone: 'Israel Standard Time',
    folderPath: './files/',
    dateBasedFileNaming: true,
    fileName: 'All_Logs',
    fileNamePrefix: 'Logs_',
    fileNameSuffix: '',
    fileNameExtension: '.log',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss.SSS',
    logLevel: 'debug',
    onlyFileLogging: true
}

//-------------------Arham--------------------------------------------------//

module.exports.Controller = {
    Authenticate: function (req, res) {
        var authOptions = {
            email: req.body.email,
            password: req.body.password
        }

        log.Info('Call Authenticate API with an email : ', authOptions.email);
        log.Info('Option : ', authOptions.email);
        database.dbEngine.Authenticate(authOptions, function (error, results, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: helper.MSG_LIST.Error_Query + error
                });

            } else {
                if (results.rows.length > 0) {
                    log.Info('Result : ', results.rows);
                    bcrypt.compare(authOptions.password, results.rows[0].password, function (err, ress) {
                        if (!ress) {
                            res.json({
                                status: false,
                                message: helper.MSG_LIST.Email_Not_Match //"Email and password does not match"
                            });

                        } else {

                            var token = jwt.sign(results.rows[0], helper.Constants.JwtSecretKey, {
                                //expiresIn: helper.Constants.ExpirationTime + 'h'
                            });
                            res.json({
                                status: true,
                                token: token,
                                message: helper.MSG_LIST.Token_Expiration_Time//'Token will expired time in 2 hours!!'
                            })
                        }
                    });
                }
                else {
                    log.Info('Error : ', helper.MSG_LIST.Email_Not_Exist);
                    res.json({
                        status: false,
                        message: helper.MSG_LIST.Email_Not_Exist //"Email does not exits"
                    });
                }
            }
        });
    },
    GetUsers:function(req,res){
        var id = req.params.id;
        database.dbEngine.GetUsers(id,(status,message,data)=>{
        helper.CreateResponse(status, message, data, function (response) {
                res.send(response);
            });
        });
    },
    GetRole: function (req, res) {
        database.dbEngine.GetRole(function (status, message, data) {
            helper.CreateResponse(status, message, data, function (response) {
                res.send(response);
            });
        });
    },
    //Users Api's
    RegisterUser: function (req, res) {

        log.Info('Call RegisterUser API with an email : ', req.body.email);
        if (req.body.Name && req.body.Address && req.body.email && req.body.password) {
            var users = {
                "role_id": req.body.roleId,
                "name": req.body.Name,
                "address": req.body.Address,
                "contact": req.body.Contact,
                "email": req.body.email,
                "password": req.body.password,
                "gender": req.body.gender,
                "country": req.body.country,
                "image": req.body.image,
                "createdby":req.body.createdby
            }
            
            database.dbEngine.RegisterUser(users, function (status, message, data) {
                helper.CreateResponse(status, message, data, function (response) {
                    res.send(response);
                });
            });
        }
        else {
            status = 'false';
            message = helper.MSG_LIST.Send_All_Required_Data
            helper.CreateResponse(status, message, null, function (response) {
                delete response.result
                res.send(response)
            })
        }
    },

    EditProfile: function (req, res) {

        if (req.body.userid && req.body.name) {
            var users = {
                "userid": req.body.userid,
                "email": req.body.email,
                "name": req.body.name,
                "address": req.body.address,
                "contact": req.body.contact,
            }
            users.loginUser = req.decoded.roleid;
            log.Info('Call Edit Profile email API : ', users.email);
            if (typeof users.userid === "undefined") {
                users.userid = req.decoded.userid;
                database.dbEngine.CheckEmailExist_Profile(users, function (EmailExists, message, data) {
                    if (!EmailExists) { //console.log('CheckEmailExist')
                        helper.CreateResponse(EmailExists, message, data, function (response) {
                            res.send(response);
                        });
                    }
                    else { //console.log('RegisterUser')
                        database.dbEngine.EditProfile(users, function (status, message, data) {
                            helper.CreateResponse(status, message, data, function (response) {
                                res.send(response);
                            });
                        });
                    }
                });
            }
            else { //console.log('validate');
                database.dbEngine.ValidateEditProfile(users, function (status, message, data) {
                    console.log(data);
                    if (status) {

                        if (users.email != data.email) {
                            database.dbEngine.CheckEmailExist_Profile(users, function (EmailExists, message, data) {
                                if (!EmailExists) { //console.log('CheckEmailExist')
                                    helper.CreateResponse(false, message, data, function (response) {
                                        res.send(response);
                                    });
                                }
                                else { //console.log('RegisterUser')
                                    database.dbEngine.EditProfile(users, function (status, message, data) {
                                        helper.CreateResponse(status, message, data, function (response) {
                                            res.send(response);
                                        });
                                    });
                                }
                            });
                        }
                        else {
                            database.dbEngine.EditProfile(users, function (status, message, data) {
                                helper.CreateResponse(status, message, data, function (response) {
                                    res.send(response);
                                });
                            });
                        }
                    }
                    else {
                        helper.CreateResponse(status, message, data, function (response) {
                            res.send(response);
                        });
                    }
                });
            }
        }
        else {
            helper.CreateResponse(false, helper.MSG_LIST.Send_All_Required_Data, null, function (response) {
                delete response.result
                res.send(response);

            });
        }
    },

    MyProfile: function (req, res) {
        var email = req.decoded.email;
        log.Info('Call My Profile API email  : ', email);
        database.dbEngine.MyProfile(email, function (status, message, data) {
            helper.CreateResponse(status, message, data, function (response) {
                res.send(response);
            });
        });
    },

    ForgetPassword: function (req, res) {
        var hostname = req.headers.host; // hostname = 'localhost:8080'
        var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
        var option = {
            "url": 'http://' + hostname + '/change-password',
            "email": req.body.email

        }
        log.Info('Call Forget Password API email ', option.email);
        database.dbEngine.ForgotPassword(option, function (status, message, data) {
            helper.CreateResponse(status, message, data, function (response) {
                res.send(response);
            });
        });
    },

    ChangePassword: function (req, res) {
        var Option = {
            "userid": req.body.userid,
            "newpassword": req.body.newpassword,
        }
        Option.loginRoleid = req.decoded.roleid;
        log.Info('Call ChangePassword API: ');
        if (typeof Option.userid == "undefined") {
            Option.userid = req.decoded.userid;
            database.dbEngine.ChangePassword(Option, function (status, message, data) {
                helper.CreateResponse(status, message, data, function (response) {
                    res.send(response);
                });
            });
        }
        else {
            database.dbEngine.Validate_ChangePassword(Option, function (status, message, data) {
                if (status) {
                    database.dbEngine.ChangePassword(Option, function (status, message, data) {
                        helper.CreateResponse(status, message, data, function (response) {
                            res.send(response);
                        });
                    });
                }
                else {
                    helper.CreateResponse(status, message, data, function (response) {
                        res.send(response);
                    });
                }
            });
        }
    }
}