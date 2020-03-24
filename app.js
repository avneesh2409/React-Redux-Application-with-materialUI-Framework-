var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var cors = require('cors');
var login = require('./controllers/login');
var formidable = require('formidable');
var fs = require('fs');
var authenticate = require('./authentication/authenticate');

app.use(cors());
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.get('/upload/:name',(req,res)=>{
//     console.log(req.params.name);
//     res.status(200).json({message:"successfully connected"})
// })

app.use('/api', router);
app.post('/token', login.Controller.Authenticate);
router.post('/register',authenticate.authenticate, login.Controller.RegisterUser);
router.get('/users/:id',authenticate.authenticate,login.Controller.GetUsers);
router.get('/role/:id',authenticate.authenticate,login.Controller.GetRole);
router.get('/admin',authenticate.authenticate,login.Controller.GetAdmin);
router.delete('/delete/:id',authenticate.authenticate,login.Controller.DeleteUser);
router.get('/singleuser/:id',authenticate.authenticate,login.Controller.GetSingleUser);
router.patch('/update',authenticate.authenticate,login.Controller.UpdateUser);
// app.post('/sendmail',login.Controller.SendEmail);
app.post('/forgotpassword',login.Controller.ForgetPassword);
// router.post('/changepasswordauth',authenticate.authenticate,login.Controller.ChangePassword);
app.post('/changepassword',login.Controller.ChangePassword)
router.post('/changepasswordauth',authenticate.authenticate,login.Controller.ChangePassword);
router.post('/fileupload',authenticate.authenticate,(req,res)=>{
    const form = new formidable.IncomingForm();
    form.parse(req,(err, fields, files) =>{
        // console.log("uploaded file :-",fields,files);you will get all the form data other then image inside fields object and image file in files object
        if (err) {
            throw err;
        }
        else{
          let oldpath = files.image.path;
          let curr = new Date();
          let newpath = 'uploads/' + files.image.name + '-' +curr.getDate() + '-' + curr.getFullYear();
    fs.rename(oldpath, newpath, function (err) {
    if (err) {
        throw err;
    }
    else{
        res.status(200).json({status:true,message:'File uploaded and moved!',location:`${process.env.URL}`+newpath});
    }
        });
    }
    });
    });

// console.log("environment variable :-",process.env.URL,process.env.PORT,process.env.DB_PASS);
var port = process.env.PORT || 8012
app.listen(port, function () {
    console.log('Api Server is running.. on Port: ' + `${process.env.PORT}`);
})
