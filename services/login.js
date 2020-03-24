var connection = require('./../config/main-config');
var mail = require('./../mails/mail-template');
var bcrypt = require('bcrypt');
var helper = require('../helpers/helper');
var url = require('url');
const log = require('node-file-logger');
const {encrypt,decrypt} = require('./../helpers/encrypt');
// const {fetchStore} = require('../client/src/helpers/fetchStore');

//-------------------Arham--------------------------------------------------//

var macroParams = helper.Constants.Macros;
exports.dbEngine = {
    Authenticate: function (authOptions, callback) {
        connection.query(helper.SQL_QUERY.Authenticate, [authOptions.email], function (error, results, fields) {
            log.Error('Error :' + error, 'database', 'Authenticate');
            callback(error, results, fields);
        });
    },

    ValidateEditProfile: function (users, callback) {
        var status = false, message = '', data = {};

        connection.query(helper.SQL_QUERY.Edit_profile_check_RoleID, [users.userid], function (error, result) {
            if (error) {
                log.Error('Error :' + error, 'database', 'ValidateEditProfile');
                message = helper.MSG_LIST.SomethingWentWrong + ': ' + error
            } else {
                if (result.rows.length > 0) {

                    //console.log(result.rows[0].roleid);
                    if (users.loginUser == 1 && (result.rows[0].roleid != 2 && result.rows[0].roleid != 3 && result.rows[0].roleid != 4)) { //Super Admin
                        message = 'Super admin can edit VideosAdmin/Advertiserr/Publisher profile.';
                    }
                    else if (users.loginUser == 2 && (result.rows[0].roleid != 3 && result.rows[0].roleid != 4)) {   //Video Admins
                        message = 'Video admin can edit only advertiser and publisher profile.';
                    }
                    else if (users.loginUser >= 3) {
                        message = 'Invalid attempt.';
                    }
                    else {
                        status = true;
                    }
                    //status = true;
                    //data = result.rows;
                }
                else {
                    message = helper.MSG_LIST.Result_Not_Found;
                }
            }
            callback(status, message, data);
        });
    },
    EditProfile: function (users, callback) {
        var status = false, message = '', data = {};
        connection.query(helper.SQL_QUERY.Edit_Profile, [users.email, users.name, users.address, users.contact, users.userid], function (error, result) {
            if (error) {
                log.Error('Error :' + error, 'database', 'EditProfile');
                message = helper.MSG_LIST.SomethingWentWrong + ': ' + error
            } else {
                status = true,
                message = helper.MSG_LIST.Profile_Updated
            }
            callback(status, message, data);
        });
    },
    GetAdmin:function(callback){
        connection.query(helper.SQL_QUERY.GetAllAdmin,[], function (error, results) {
            if (error) {
                log.Error('Error :' + error, 'database', 'Imali');
                message = helper.MSG_LIST.SomethingWentWrong + ': ' + error
            } else {
                if (results) {
                    status = true;
                    data = results.rows;
                    message = "Success";
                }
                else {
                    message = helper.MSG_LIST.Users_Not_Exist;
                }
            }
            callback(status, message, data);
        });
    },
    GetRole:function(roleId,callback){
        var status = false, message = '', data = {};

        if(roleId == 1){
            connection.query(helper.SQL_QUERY.GetAdminRole,[], function (error, results) {
                if (error) {
                    log.Error('Error :' + error, 'database', 'Imali');
                    message = helper.MSG_LIST.SomethingWentWrong + ': ' + error
                } else {
                    if (results) {
                        status = true;
                        data = results.rows;
                        message = "Success";
                    }
                    else {
                        message = helper.MSG_LIST.Users_Not_Exist;
                    }
                }
                callback(status, message, data);
            });
        }else{
        connection.query(helper.SQL_QUERY.GetRole,[roleId], function (error, results) {
            if (error) {
                log.Error('Error :' + error, 'database', 'Imali');
                message = helper.MSG_LIST.SomethingWentWrong + ': ' + error
            } else {
                if (results) {
                    status = true;
                    data = results.rows;
                    message = "Success";
                }
                else {
                    message = helper.MSG_LIST.Users_Not_Exist;
                }
            }
            callback(status, message, data);
        });
    }
},
    GetUsers:function (roleId,callback)
    {
        var status = false, message = '', data = {};
        if(roleId == 1)
        {
            connection.query(helper.SQL_QUERY.GetJoinTable,[], function (error, results) {
                if (error) {
                    log.Error('Error :' + error, 'database', 'Imali');
                    message = helper.MSG_LIST.SomethingWentWrong + ': ' + error
                } else {
                    if (results.rows.length > 0) {
                        results.rows[0].password = undefined;
                        status = true;
                        data = results.rows;
                    }
                    else {
                        message = helper.MSG_LIST.Users_Not_Exist;
                    }
                }
                callback(status, message, data);
            });
        }else{
        connection.query(helper.SQL_QUERY.GetUsers, [roleId], function (error, results) {
            if (error) {
                log.Error('Error :' + error, 'database', 'Imali');
                message = helper.MSG_LIST.SomethingWentWrong + ': ' + error
            } else {
                if (results.rows.length > 0) {
                    results.rows[0].password = undefined;
                    status = true;
                    data = results.rows;
                }
                else {
                    message = helper.MSG_LIST.Users_Not_Exist;
                }
            }
            callback(status, message, data);
        });
    }
    },
    MyProfile: function (email, callback) {
        var status = false, message = '', data = {};
        connection.query(helper.SQL_QUERY.MyProfile, [email], function (error, results) {
            if (error) {
                log.Error('Error :' + error, 'database', 'MyProfile');
                message = helper.MSG_LIST.SomethingWentWrong + ': ' + error
            } else {
                if (results.rows.length > 0) {
                    results.rows[0].password = undefined;
                    status = true;
                    data = results.rows;
                }
                else {
                    message = helper.MSG_LIST.Email_Not_Exist;
                }
            }
            callback(status, message, data);
        });
    },
    ForgotPassword: function (option, callback) {
        var status = false, message = '', data = {};
        connection.query(helper.SQL_QUERY.Forgot_Password, [option.email], function (error, results) {
            if (error) {
                log.Error('Error :' + error, 'database', 'ForgotPassword');
                message = helper.MSG_LIST.SomethingWentWrong + ': ' + error;
            } else {
                if (results.rows.length > 0) {
                    let token = results.rows[0].userid;
                     var mailOptions = {
                        to: results.rows[0].email,
                        subject: "Forgotten Password Reset! ",
                        html: "Hello " + results.rows[0].name + ",<br><br> As per your request, we have sent you the password reset link. Click on the following link to reset your password:<br><br>" + `<a href='${option.url}?token=${token}' >Click Here</a>` + " <br><br>Warm Regards,<br> IMALI TEAM"
                    }
                    mail.sendMail(mailOptions);
                    status = true;
                    message = helper.MSG_LIST.Forgot_Pwd;
                }
                else {
                    message = helper.MSG_LIST.Email_Not_Exist;
                }
            }
            callback(status, message, data);
        });
    },
    UpdateUser:function(user,callback){
        var status = false,message = '',data = {};
        connection.query(helper.SQL_QUERY.UpdateUser,[user.address,user.contact,user.gender,user.userid],(xreq,xres)=>{
            if(xres.rowCount > 0){
                message = "updated";
                status  = true;
            }
            else{
                message = "record not found for userid = "+user.userid;
            }
        callback(status,message,data);
        })
    },
GetSingleUser:function(id,callback){
    var status = false,message='',data={};
    connection.query(helper.SQL_QUERY.GetSingleUser,[id], function (xreq, xres) {
        if(xres.rowCount > 0){
            message = "Success";
            status = true;
            data = xres.rows;
        }
        else{
            message = "No User Found for id = "+id;
        }
        
        callback(status, message,data);
    });
},
    DeleteUser:function(id,callback){
        var status = false, message = '', data = {};
        connection.query(helper.SQL_QUERY.Delete_Users,[id], function (xreq, xres) {
            message = "Record successfully deleted";
            status = true;
            callback(status, message,data);
        });
    },
    CheckEmailExist_Profile: function (users, callback) {
        var status = false, message = '', data = {};
    connection.query(helper.SQL_QUERY.Edit_exit_email_profile, [users.email, users.userid], function (xreq, xres) {
            if (xres.rows[0].exists) {
                message = 'email id already exist.';
            }
            else {
                status = true;
            }
            callback(status, message);
        });
    },
    RegisterUser: function (users, callback) {
        var status = false, message = '', data = {};
        var today = new Date();
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(users.password, salt);
        //
        connection.query(helper.SQL_QUERY.Register_User_Insert, [users.role_id,users.email, hash,users.gender,users.country, users.name, users.address,users.contact,today, parseInt(users.createdby) , '1',users.image], function (error, result) {
            if (error) {
                log.Error('Error :' + error, 'database', 'RegisterUser');
                message = helper.MSG_LIST.SomethingWentWrong + error;
            } else {
                // var mailOptions = {
                //     to: result.rows[0].email,
                //     subject: "Congratulation! Thanks for creating your account",
                //     html: "Hello " + users.name + ",<br><br>Congratulation!!. Thanks for creating an account. You have successfully registered.<br><br> Regards,<br> NAYEEM TEAM"
                // }
                //mail.sendMail(mailOptions);
                status = true;
                data = result.rows;
                // message = result;
                message = 'user registered sucessfully - Email : ' + result.rows[0].email;
            }
            callback(status, message, data);
        });
    },
    ValidateRegisterUser: function (users, callback) {
        var status = false, message = '', data = {};
        if (users.loginUser_roleid == 1 && (users.role_id != 2 && users.role_id != 3 && users.role_id != 4)) { //Super Admin
            message = 'Super admin can create VideosAdmin/Advertiserr/Publisher.';
        }
        else if (users.loginUser_roleid == 2 && (users.role_id != 3 && users.role_id != 4)) {   //Video Admins
            message = 'Video admin can create only advertiser and publisher';
        }
        else if (users.loginUser_roleid >= 3) {
            message = 'Invalid attempt.';
        }
        else {
            status = true;
        }
        callback(status, message, data);
        // connection.query(helper.SQL_QUERY.Register_User,[users.createdby], function (rolErr, roleRes) {
        //     if (rolErr) {
        //         message = helper.MSG_LIST.SomethingWentWrong; // nayeem to check
        //     } else {
        //         if (roleRes.rows.length > 0) {
        //             if(roleRes.rows[0].roleid == 1 &&  (users.role_id != 2 && users.role_id != 3 && users.role_id != 4)){ //Super Admin
        //                 message = 'Super admin can create VideosAdmin/Advertiserr/Publisher.';
        //             }
        //             else if(roleRes.rows[0].roleid == 2 && (users.role_id != 3 && users.role_id != 4)){   //Video Admins
        //                 message = 'Video admin can create only advertiser and publisher';
        //             }
        //             else if(roleRes.rows[0].roleid >= 3) {
        //                 message = 'Invalid attempt.';
        //             }
        //             else
        //             {
        //                 status = true;
        //             }
        //         }
        //     }
        //     callback(status, message, data);
        // });
    },
    Validate_ChangePassword:function(option,callback){
        var status = false, message = '', data = {};
        connection.query('select * from account where userid = $1',[option.userid],function(error,results){
                    if(error || results.rows.length == 0){
                        log.Error("Error :" + error,'database','validate_password');
                        message = 'token expired'
                    }
                    else{
                        status = true;
                    }
                    callback(status,message,data);
                        });
},
    ChangePassword: function (Option, callback) {
        var status = false, message = '', data = {};
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(Option.newpassword, salt);
        connection.query('update account set password = $1 where userid = $2', [hash, Option.userid], function (error, result) {
            if (error) {
                log.Error('Error :' + error, 'database', 'ChangePassword');
                message = helper.MSG_LIST.SomethingWentWrong + ': ' + error

            } else {
                status = true;
                message = 'password updated successfully.';
            }
            callback(status, message);
        });
    }



}

