const fs = require('fs');
var encrydecry = require('../middleware/common-fun');  
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var localStorage = require('localStorage')

const uniqueRandom = require('unique-random');
const randunique = uniqueRandom(10000000000, 99999999999);

module.exports = {  
 
    dashboardwp:(req, res) => {  
        let userid=req.body.userid; 
        let TotalHours=0;
        let BalanceHours=0;  
        let usernameQuery1 = " SELECT * FROM `wp_hours` WHERE `user_id` = '"+userid+"'";     
    db.query(usernameQuery1, (err, result) => {  
        if (err) {    
        return res.status(200).json({status :200,TotalHours:TotalHours,BalanceHours:BalanceHours,wpstatus:0});
        }  
        TotalHours= result[0].total_hours;  
        BalanceHours= result[0].balance_hours;  
        return res.status(200).json({status :200,TotalHours:TotalHours,BalanceHours:BalanceHours,wpstatus:1});
    });  
}, 


 
notificationwp:(req, resf) => {  
    var data = { 
        app_id: "88c090db-e908-4c22-857c-ba9025a471a8",
        contents: {"en": "English Message"},
        included_segments: ["Active Users"]
      }; 
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic N2ZhNWM5ZmUtNDlmOC00MWRmLWJlZWItMDA5OWRmMTNkNzEz"
    };
    var options = {
      host: "onesignal.com",
      port: 443,  
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    var https = require('https');
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
        return resf.status(200).json({ status :200, wpstatus:1,message :JSON.parse(data)  });
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });
    req.on('error', function(e) {  
        return resf.status(200).json({ status :500, wpstatus:0,message :e  });  
      console.log("ERROR:");
      console.log(e);
    });   
    req.write(JSON.stringify(data));
    req.end();
}, 




};
