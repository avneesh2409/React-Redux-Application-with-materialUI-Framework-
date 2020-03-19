//------------------CONSTANT----------------------------------------------//
exports.Constants = {
    JwtSecretKey: "&imali$891=!41#0",
    ExpirationTime: '3',
    Macros: "&TrackingType={TrackingType}&Url={Url}&UserAgent={UserAgent}&width={width}&height={height}&duration={duration}&video_url={video_url}&video_description={video_description}&video_title={video_title}&video_id={video_id}&autoplay={autoplay}&mute={mute}&site_url={site_url}&ad_position={ad_position}&ip={ip}&custom1={custom1}&custom={custom}&extra_params={extra_params}&description={description}"
}

exports.ConnectionString = {
    server : "postgres://postgres:Tftus@123@localhost:5432/ImaliDB",
}

exports.MSG_LIST = {
    Token_Expiration_Time: "Token will expire in " + exports.Constants.ExpirationTime + " hours.",
    Email_Not_Match: "Email or password incorrect",
    Email_Not_Exist: "Email does not exits",
    Users_Not_Exist:"users not exists",
    Error_Query: "there are some error with query",
    EditVast_NotVideoAdmin: "This Vast id not related to you",
    CreateVast_CheckVideoAdmin: "Only super admin and video admin can submit the Advertisement",
    GetAllVast_NotExistAdv: "Something went wrong, Record not found.",
    Invalid_Token: "Invalid Token",
    SomethingWentWrong: "Something went wrong.",
    Profile_Updated: 'Your profile updated successfully.',
    Email_Not_Exist: 'Email does not exits',
    Forgot_Pwd: "Please check your mail and click the link for change the password.",
    Result_Not_Found: 'Results Not Found.',
    Send_All_Required_Data: 'Please send all the necessary fields'
}

exports.SQL_QUERY = {
    Authenticate: "SELECT * FROM public.account where email = $1",
    Register_User: "SELECT * from account where userid = $1",
    Regsiter_User_Exist: "SELECT exists(select 1 from account where userid = $1)",
    Regsiter_Email_Exist: "SELECT exists(select 1 from account where email = $1)",
    Register_User_Insert: "INSERT INTO account(roleid,email, password,gender,country,name, address,contact, created_on, createdby, isactive,image) VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING email",
    Edit_Profile: "Update account Set email = $1, name = $2, address = $3, contact = $4 where userid = $5",
    MyProfile: "SELECT * FROM public.account where email = $1",
    GetUsers: "Select userid,email,name,gender,role_name,country,created_on,image,createdby,isactive,address,contact from account join role on roleId=role_id where createdby = $1",
    GetAllUsers:"Select * from public.account where roleId > 1",
    GetRole : "Select * from role where role_id > $1",
    GetAdminRole: "Select * from role where role_id = 2",
    GetJoinTable:"Select userid,email,name,gender,role_name,country,image,created_on,createdby,isactive,address,contact from account join role on account.roleId=role.role_id where account.roleId > 1 ",
    Forgot_Password: "SELECT * FROM public.account where email = $1",
    Edit_profile_check_RoleID: "SELECT * FROM account where userid = $1",
    Edit_exit_email_profile: "SELECT exists(select 1 from account where email = $1 And userid !=$2)",
    Tracking_Detail_Data: "select * from Tracking_Detail_To_S3()",
}

exports.ResponseObject = {
    status: true,
    //statusCode:200,
    message: "",
    result: {}
}

exports.RequestModel = {
    user: function (req) {
        var users = {
            "user_id": req.body.id,
            "role_id": req.body.roleId,
            "name": req.body.Name,
            "address": req.body.Address,
            "contact": req.body.Contact,
            "email": req.body.email,
            "password": req.body.password,
            "createdby": req.decoded.userid
        }
        return users;
    }
}

exports.CreateResponse = function (status, message, data, callback) {
    var responseObject = JSON.parse(JSON.stringify(exports.ResponseObject));
    responseObject.status = status;
    responseObject.message = message;
    responseObject.result = data;
    callback(responseObject);
}