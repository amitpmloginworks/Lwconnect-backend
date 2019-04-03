const fs = require('fs');
var encrydecry = require('../middleware/common-fun');  
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var localStorage = require('localStorage')

const uniqueRandom = require('unique-random');
const randunique = uniqueRandom(10000000000, 99999999999);

module.exports = { 

      
    getloginwp:(req, res) => {
         let emailid = req.body.emailid;  
         let password = req.body.password;         
         var encrytpass = encrydecry.sha1algo(req.body.password);   
         //console.log("encrytpass==",encrytpass)     
         let usernameQuery = "SELECT * FROM `wp_users` WHERE user_email = '" + emailid + "' and user_pass= '" + encrytpass + "' and ID !='1'";    
         console.log("usernameQuery ==", usernameQuery)       
         db.query(usernameQuery, (err, result) => { 
             //console.log("statusCode==",res.statusCode)        
             if (err) {
                // return res.status(500).send(err); 
                return res.status(500).json({ message: 'errr5', status :500, msg:err, wpstatus:-1  });
             }
             if (result.length > 0) {  
                // console.log("result==",result)   
                 return res.status(200).json({ status :200, getdata:result , wpstatus:1  });   
                 //res.render('add-player.ejs', { message, title: "Welcome to Socka | Add a new player" }); 
             } 
             else {  
                return res.status(200).json({  message: 'Invalid email and passord', status :200, wpstatus:0  }); 
         }
         });
     },

     getresetwp:(req, res) => {

      let emailid = req.body.emailid;  
      let password=encrydecry.wprandomtxt(9);
      var encrytpass = encrydecry.sha1algo(password); 

     //  https://myaccount.google.com/lesssecureapps?pli=1   // enable smtp
    // https://accounts.google.com/b/0/DisplayUnlockCaptcha  // enable smtp

      let usernameQuery = "SELECT * FROM `wp_users` WHERE user_email = '" + emailid + "'";         
      db.query(usernameQuery, (err, result) => {       
          if (err) {
             return res.status(500).json({ message: 'errr5', status :500, msg:err });
          }
          if (result.length > 0) {  
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { 
              user: 'nishant.loginworks@gmail.com',  
              pass: 'ngarg2801$'
             }
      });    
      let usernameQuery = "update `wp_users` set user_pass='"+encrytpass+"' WHERE user_email = '" + emailid + "'";         
      db.query(usernameQuery, (err, result) => {     }); 
    var content_body1 = '<p>Hi '+result[0].user_login+',</p>'; 
      var content_body2  = '<p>Your email id is : <b>'+result[0].user_email+'</b></p><p>Your password has been automatically generated: <b>'+password+'</b></p><br><p style="text-align:center;">Loginworks Power BI Portal</p><p style="text-align:center;">Powered by <a href="https://www.loginworks.com/lp/power-bi-consulting-services.php">Loginworks Power BI Portal</a></p>';
      content_body = content_body1 + content_body2;
      var mailOptions = {
          from: 'support@loginworks.com', 
          to: result[0].user_email, 
          subject: 'Reset Password',
          text: 'Loginworks Power BI Portal',
          html: content_body
        }; 
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
          } else { 
            return res.status(200).json({ status :200, message:'Mail Sent Successfully',wpstatus:1  }); 
          }
        });    
          } 
          else {  
             return res.status(200).json({  message: 'Invalid email', status :200,wpstatus:0  }); 
      }
      });









    },



testapp:(req, res) =>   {
  let agent_array =[]; 
  let metaarrval ;
  let Querycat = "SELECT * FROM `wp_termmeta` where term_id='29'"; 
    console.log("Querycat==",Querycat)  
    db.query(Querycat, (err1, result1) => {        
        if (err1) {
           return res.status(500).json({ message: 'errr2', status :500, msg:err1,wpstatus:0 });
        } 
        if (result1.length > 0) {
           
          var metaarr = result1[0].meta_value; 
          console.log("result1[0].meta_value==",result1[0].meta_value)    
          var metasplit = metaarr.split("\";");   
          let metalen = metasplit.length-1; 

          let metasplit0 = metasplit[0].split('\:"'); 
          agent_array.push(metasplit0[1]);
          metaarrval=metasplit0[1];  
          console.log("metaarrval==",metaarrval)  

          // for(let i=0;i<metalen.length;i++){    
          //     let metasplit0 = metasplit[i].split('\:"'); 
          //     agent_array.push(metasplit0[1]);
          //     metaarrval=metasplit0[1];
          //     console.log("metaarrval==",metaarrval)   
          // }
        } 
        else {  }
    });

  // var encrytpass = encrydecry.sha1algo(req.body.password); 
  // console.log("encrytpass==",encrytpass);

  // var encrytpass11 = encrydecry.hashpassalgo(req.body.password); 
  // console.log("encrytpass11==",encrytpass11);

  // return res.json({    message:'Successfully'     });

var now = new Date();
var date1 = dateFormat(now, "dddd, d mmm yyyy, H:MM");  
return res.json({    message: date1     }); 

// Basic usage

// Last updated: Friday, 7 Dec 2018, 12:38

/*
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

/*
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
    return res.status(200).json({ message:'Successfully',agent_arr: result1[0].meta_value,agent_array:agent_array  }); 
    } 
    else { 
        return res.status(200).json({  message: 'No record found', status :200,wpstatus:1  }); 
}
});
*/




  





},

};
