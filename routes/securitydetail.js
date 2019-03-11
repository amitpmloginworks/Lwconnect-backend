const fs = require('fs');
var encrydecry = require('../middleware/common-fun');  
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var localStorage = require('localStorage')

module.exports = { 

      
    getloginwp:(req, res) => {
         let emailid = req.body.emailid;  
         let password = req.body.password;         
         var encrytpass = encrydecry.sha1algo(req.body.password);   
         //console.log("encrytpass==",encrytpass)     
         let usernameQuery = "SELECT * FROM `wp_users` WHERE user_email = '" + emailid + "' and user_pass= '" + encrytpass + "'";  
         console.log("usernameQuery ==", usernameQuery)       
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
  /*
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

var date7 = dateFormat(now, "yyyy-mm-dd HH:MM:ss"); 
// 2019-03-05 13:20:44
console.log("date7==",date7)

var date8 = dateFormat(now, "h:MM tt");
// Saturday, June 9th, 2007, 5:46:21 PM
console.log("date8==",date8)
*/


let final_array = new Array();


let agent_array = new Array();
let usernameQuery = " SELECT * FROM `wp_termmeta` where term_id='28'"; 
db.query(usernameQuery, (err1, result1) => {        
    if (err1) {
       return res.status(500).json({ message: 'errr5', status :500, msg:err1,wpstatus:0 });
    }
     
    if (result1.length > 0) { 

      var metaarr = result1[0].meta_value; 
      var metasplit = metaarr.split("\";");   
      final_array=result1;
      let metalen = metasplit.length-1;
      for(let i=0;i<metalen;i++){   
          let metasplit0 = metasplit[i].split('\:"'); 
          agent_array.push(metasplit0[1]);
      }
      
    // for (var j = 0; j < result1.length; j++){
      //  let usernameQuery1 = "SELECT * FROM `wp_terms` WHERE `term_id` = '" + result1[j].term_id + "'";
      //  db.query(usernameQuery1, (err, result) => {        
      //      if (err) {
      //         return res.status(500).json({ message: 'errr5', status :500, msg:err,wpstatus:0 });
      //      }  
      //       for (var i = 0; i < result.length; i++){
      //       second_array.push({ term_id:result[i].term_id,name:result[i].name,slug:result[i].slug });  
      //       }          
      //      final_array.push({ message:"Fetch records", second_array:second_array }); 
      //       if(final_array.length ==j){          
      //         return res.status(200).json({ status :200, final_array:second_array,wpstatus:1 });
      //       }            
      //  }); 
    //  }  
    return res.status(200).json({ message:'Successfully',agent_arr: result1[0].meta_value,agent_array:agent_array  }); 

    } 
    else { 
        return res.status(200).json({  message: 'No record found', status :200,wpstatus:1  }); 
}
});



  





},

};
