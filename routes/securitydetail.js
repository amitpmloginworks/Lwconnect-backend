const fs = require('fs');
var encrydecry = require('../middleware/common-fun');  
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');

module.exports = { 

     
    getloginwp:(req, res) => {
         let message = '';
         let emailid = req.body.emailid;  
         let password = req.body.password;
         var encrytpass = encrydecry.sha1algo(req.body.password);   
         //console.log("encrytpass==",encrytpass)     
         let usernameQuery = "SELECT * FROM `wp_users` WHERE user_email = '" + emailid + "' and user_pass= '" + encrytpass + "'";  
         //console.log("usernameQuery ==", usernameQuery)       
         db.query(usernameQuery, (err, result) => { 
             //console.log("statusCode==",res.statusCode)        
             if (err) {
                // return res.status(500).send(err); 
                return res.status(500).json({ message: 'errr5', status :500, msg:err });
             }
             if (result.length > 0) {  
                // console.log("result==",result)   
                 return res.status(200).json({ status :200, getdata:result  });  
                 //res.render('add-player.ejs', { message, title: "Welcome to Socka | Add a new player" }); 
             } 
             else {  
                return res.status(200).json({  message: 'Invalid email and passord', status :200  }); 
         }
         });
     },

     getresetwp:(req, res) => {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'ytuxedo786@gmail.com',  
                   pass: 'yashudievo'
               }
        }); 
      var content_body1 = '<p>We heard that you lost your Scavanger password. Sorry about that! But don’t worry! You can use the following link to reset your password:</p>';
        var content_body2  = '<p>If you don’t use this link within 3 hours, it will expire. To get a new password reset link, visit <p>Thanks</p><p>Your friends at Scavanger</p>';
        content_body = content_body1 + content_body2;
        var mailOptions = {
            from: 'scavanger@gmail.com', 
            to: 'chetankumarcs2012@gmail.com',
            subject: 'Reset Password',
            text: 'That was easy!',
            html: content_body
          }; 

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log("err==",error);
            } else { 
              console.log('Email sent: ' + info.response);
              return res.status(200).json({
                message:'Mail Sent Successfully'
            });

            }
          });




    },



testapp:(req, res) =>   {
    
var now = new Date();
console.log("now==",now) 
// Basic usage
var date1 = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
// Saturday, June 9th, 2007, 5:46:21 PM
console.log("date1==",date1)
// You can use one of several named masks     
var date2 =  dateFormat(now, "isoDateTime");
console.log("date2==",date2)
// 2007-06-09T17:46:21

// ...Or add your own
dateFormat.masks.hammerTime = 'HH:MM! "Can\'t touch this!"';
var date3 = dateFormat(now, "hammerTime");
console.log("date3==",date3)
// 17:46! Can't touch this!

// You can also provide the date as a string
var date4 =  dateFormat("Jun 9 2007", "fullDate");
console.log("date4==",date4)  
// Saturday, June 9, 2007

var date5 = dateFormat(now, 'HH:MM');
console.log("date5==",date5)  

var date6 =  dateFormat("2019-02-25 15:29:25", "fullDate");  
console.log("date6==",date6)  

return res.status(200).json({
  message:'Successfully'
});

}
 


};
