var nodemailer = require("nodemailer");

//-------------------Arham--------------------------------------------------//

//Mail Functionality
var smtpTransport = nodemailer.createTransport({service: "Gmail",
    auth: {
    //    user:"Support@uChange.cash",
    //    pass:"uchange@786"
       user:"avneeshdwivedi.tft@gmail.com",
       pass:"Avneesh@2409"
    }
});

module.exports.sendMail = function (mailOptions,req,res) {
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            // res.end("error");
        }else{
            console.log("Message sent: ");
            //  res.end("Email sent successfully.");
        }
    });
}


