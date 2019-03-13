const fs = require('fs');
var encrydecry = require('../middleware/common-fun');  
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var localStorage = require('localStorage')

const uniqueRandom = require('unique-random');
const randunique = uniqueRandom(10000000000, 99999999999);

module.exports = {  
 
mytaskwp:(req, res) =>   { 
  
  
var second_array= new Array();
var final_array= new Array();
var now = new Date();
  let wppostID = req.body.postid;
  let userid=req.body.userid;
  var datemodify="";
  var datefirst;
  var datedb;
  let styleClassvar="";
  let handsvar="";  
 
  let usernameQuery = " SELECT * FROM `wp_comments` WHERE `comment_post_ID` = '" + wppostID + "' group by DATE_FORMAT(comment_date,'%y-%m-%d') "; 
  db.query(usernameQuery, (err1, result1) => {        
      if (err1) {
         return res.status(500).json({ message: 'errr5', status :500, msg:err1 });
      }
      if (result1.length > 0) { 
      for (var j = 0; j < result1.length; j++){ 
           var datecurrent = dateFormat(result1[j].comment_date, "yyyy-mm-dd");
         let usernameQuery1 = " SELECT * FROM `wp_comments` WHERE `comment_post_ID` = '" + result1[j].comment_post_ID + "' and DATE(comment_date) =DATE('"+datecurrent+"')";              
         db.query(usernameQuery1, (err, result) => {        
             if (err) {
                return res.status(500).json({ message: 'errr5', status :500, msg:err });
             }  
               for (var i = 0; i < result.length; i++){ 
                datefirst= dateFormat(now, "mm/dd/yyyy");
                datedb=dateFormat(result[i].comment_date, "mm/dd/yyyy");
              if(datefirst==datedb){
               datemodify="Today";
              }
              else {
               datemodify=dateFormat(result[i].comment_date, "fullDate");
              } 
              if(result[i].user_id==userid){
                styleClassvar="chat-message right";
                handsvar=1;
              }
              else{
                styleClassvar="chat-message left";
                handsvar=2;  
              }
                 second_array.push({ comment_ID:result[i].comment_ID,comment_post_ID:result[i].comment_post_ID,comment_author:result[i].comment_author,comment_author_email:result[i].comment_author_email,comment_date:result[i].comment_date,comment_content:result[i].comment_content,comment_approved:result[i].comment_approved,comment_parent:result[i].comment_parent,user_id:result[i].user_id,posttime:dateFormat(result[i].comment_date, "h:MM tt"),styleClass:styleClassvar,hands:handsvar })   
              }          
             final_array.push({ modifydate:datemodify, second_array:second_array }) 
             second_array=[]; 
             datemodify="";
              if(final_array.length ==j){      
                return res.status(200).json({ status :200, final_array:final_array });
              }            
         });  
       }     
      } 
      else {      
         return res.status(200).json({  message: 'No record found', status :200  }); 
  }
});


},



mytaskreplywp:(req, res) =>   { 

  var now = new Date();

  let wppostID = req.body.postid;
  let userid=req.body.userid;
  let postcontent=req.body.postcontent;
  let Usrauther;
  let Usremail;
  let Usrurl;
  let datecurrent


    let usernameQuery = " SELECT * FROM `wp_users` WHERE `ID` = '" + userid + "'"; 
    db.query(usernameQuery, (err, result) => {        
        if (err) {
           return res.status(500).json({ message: 'errr5', status :500, msg:err, wpstatus:0 });
        }
        if (result.length > 0) { 
          Usrauther=result[0].user_nicename;
          Usremail=result[0].user_email;
          Usrurl=result[0].user_url;
           let usernameQuery1 = "SELECT * FROM `wp_comments` WHERE `comment_post_ID` = '" + wppostID + "'";   
           db.query(usernameQuery1, (err1, result1) => {        
               if (err1) {
                  return res.status(500).json({ message: 'errr5', status :500, msg:err1, wpstatus:0 });
               }
               if (result1.length > 0) {  
                var now = new Date();
                datecurrent = dateFormat(now, "yyyy-mm-dd HH:MM:ss"); 
                let usernameQuery2 = "UPDATE `wp_posts` SET `post_date`='" + datecurrent + "', `post_date_gmt`='" + datecurrent + "', `post_content`=concat('"+postcontent+"',ifnull(post_content,'')), `comment_count`=comment_count+1 WHERE ID='" +
                wppostID + "'";     
                db.query(usernameQuery2, (err2, result2) => {
                if (err2) {
                    return res.status(500).json({ message: 'errr', status :500, wpstatus:0 });
                }
                var strIP = localStorage.getItem('ipInfo');   
                var strIPClient = JSON.parse(strIP).clientIp; 
                let usernameQuery3 = "INSERT INTO `wp_comments` ( `comment_post_ID`, `comment_author`, `comment_author_email`, `comment_author_url`, `comment_author_IP`, `comment_date`, `comment_date_gmt`, `comment_content`, `comment_karma`, `comment_approved`, `comment_agent`, `comment_type`, `comment_parent`, `user_id`) VALUES ('" +
                wppostID + "', '" + Usrauther + "', '" + Usremail + "', '" + Usrurl + "', '" + strIPClient + "', '" + datecurrent + "', '" + datecurrent + "','"+ postcontent + "', '0', '1', '', '', '0', '" + userid + "')";    
                db.query(usernameQuery3, (err3, result3) => {
                if (err3) {
                    return res.status(500).json({ message: 'errr', status :500, wpstatus:0 });
                }
                commentID=result1.insertId; 
                return res.status(200).json({  message: "Your message has been successfully sent.", status :200, wpstatus:1,currenttime:dateFormat(datecurrent, "h:MM TT"),currentdate:datecurrent,commentID:commentID  });    
            }); 
            }); 
               }
           });      
        } 
        else {      
           return res.status(200).json({ message: 'you are not authorized to use', status :200,wpstatus:0 });  
    }
  });
  },
    
mytasklistwp:(req, res) =>   {  
    var final_array= new Array();
    let userid=req.body.userid;

    var getdataval=false;
    // for  wp_user  variable
    let Usrauther;
    let Usremail;
    let Usrurl;

    //// for  wp_posts  variable
    let PostID;
    let TermID;
    let TermName;
    let PostDate;
    let PostTitle;  


      let usernameQuery = " SELECT * FROM `wp_users` WHERE `ID` = '" + userid + "'"; 
      db.query(usernameQuery, (err, result) => {        
          if (err) {
             return res.status(500).json({ message: 'errr5', status :500, msg:err, wpstatus:0 });
          }
          if (result.length > 0) {

            Usrauther=result[0].user_nicename;
            Usremail=result[0].user_email;
            Usrurl=result[0].user_url;
 
             let usernameQuery1 = " SELECT * FROM `wp_posts`  WHERE `post_author` = '" + userid + "' and post_type ='fast_ticket'";   
             db.query(usernameQuery1, (err1, result1) => {        
                 if (err1) {
                    return res.status(500).json({ message: 'errr5', status :500, msg:err1, wpstatus:0 });
                 }
                 if (result1.length > 0) {
                  let incrementval=0;  
                for(var i=0;i<result1.length; i++){
 
                PostID=result1[i].ID;
                
                PostDate=dateFormat(result1[i].post_date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
            
                PostTitle=result1[i].post_title;

                final_array.push({ TermName:"", PostTitle:PostTitle,PostDate:PostDate,PostID:PostID,Usrauther:Usrauther,image:"" });  
                let usernameQuery2 = "SELECT * FROM `wp_term_relationships` WHERE `object_id`='"+result1[i].ID+"'";     
                  db.query(usernameQuery2, (err2, result2) => {
                  if (err2) {
                      return res.status(500).json({ message: 'errr', status :500, wpstatus:0 });
                  }

                TermID = result2[1].term_taxonomy_id;  
                let usernameQuery3 = "SELECT * FROM `wp_terms` where term_id='" +TermID + "'";   
                db.query(usernameQuery3, (err3, result3) => {
                if (err3) {
                      return res.status(500).json({ message: 'errr', status :500, wpstatus:0 });
                } 
                TermName=result3[0].name;
                var finalindex="";
               final_array.forEach((number, index) =>  { if(number.PostID == result2[1].object_id)  { finalindex=index; return index; } }); 
                final_array[finalindex].TermName=TermName;    
                // final_array.push({ TermName:TermName, PostTitle:result1[i].post_title,PostDate:dateFormat(result1[i].post_date, "dddd, mmmm dS, yyyy, h:MM:ss TT"),PostID:result1[i].ID,Usrauther:result[0].user_nicename,image:"" }); 
                incrementval++
                if(final_array.length ===incrementval){   
                  return res.status(200).json({  message: "Data recevied successfully.", status :200, wpstatus:1,final_array:final_array });    
                }
                });  
              }); 
            }  // end of for loop here ... 
            }
        }); 
        } 
        else {      
        return res.status(200).json({  message: 'you are not authorized to use', status :200 , wpstatus:0 });  
      }
    });
    },


    tasksrcwp:(req, res) =>   { 

      var final_array= new Array();
 
      let userid=req.body.userid;
      let postname=req.body.postname;
      let statuswp=req.body.status;
      let categorywp=req.body.category;  

      var getdataval=false;
      // for  wp_user  variable
      let Usrauther;
      let Usremail;
      let Usrurl;
  
      //// for  wp_posts  variable
      let PostID;
      let TermID;
      let TermName;
      let PostDate;
      let PostTitle;  
      
      let usernameQuery = " SELECT * FROM `wp_users` WHERE `ID` = '" + userid + "'"; 
        db.query(usernameQuery, (err, result) => {        
            if (err) {
               return res.status(500).json({ message: 'errr5', status :500, msg:err, wpstatus:0 });
            }
            if(result.length > 0) {
              Usrauther=result[0].user_nicename;
              Usremail=result[0].user_email;
              Usrurl=result[0].user_url;
               let usernameQuery1 = " SELECT a.* FROM `wp_posts` a  join wp_term_relationships b  on a.ID = b.object_id WHERE ping_status='"+statuswp+"' and post_author ='" + userid + "' and `post_title` like '%" + postname + "%' or `post_title` like '%" + postname + "%' and b.term_taxonomy_id='"+categorywp+"'";     
               db.query(usernameQuery1, (err1, result1) => {        
                   if (err1) {
                      return res.status(500).json({ message: 'errr5', status :500, msg:err1, wpstatus:0 });
                   }
                   if (result1.length > 0) {    
                  for(var i=0;i<result1.length; i++)  {
                  PostID=result1[i].ID;
                  PostDate=dateFormat(result1[i].post_date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
                  PostTitle=result1[i].post_title;
                  let usernameQuery2 = "SELECT * FROM `wp_term_relationships` WHERE `object_id`='" + PostID + "'";    
                    db.query(usernameQuery2, (err2, result2) => {
                    if (err2) {
                        return res.status(500).json({ message: 'errr', status :500, wpstatus:0 });
                    }
                  TermID = result2[1].term_taxonomy_id;  
                  let usernameQuery3 = "SELECT * FROM `wp_terms` where term_id='" +TermID + "'";   
                  db.query(usernameQuery3, (err3, result3) => {
                  if (err3) {
                        return res.status(500).json({ message: 'errr', status :500, wpstatus:0 });
                  } 
                  TermName=result3[0].name;
                  final_array.push({ TermName:TermName, PostTitle:PostTitle,PostDate:PostDate,PostID:PostID,Usrauther:Usrauther,image:"" }); 
                  if(final_array.length ==result1.length){  
                    return res.status(200).json({  message: "Data recevied successfully.", status :200, wpstatus:1,final_array:final_array });    
                  }   
                  }); 
                }); 
              }  // end of for loop here ... 
            }
          }); 
          } 
          else {      
          return res.status(200).json({ message: 'you are not authorized to use', status :200 , wpstatus:0 }); 
        }
      });
    },






    taskcatwp:(req, res) =>   { 

      var second_array= new Array();
      var final_array= new Array();
 
      let userid=req.body.userid;
    
        let usernameQuery = " SELECT * FROM `wp_term_taxonomy` WHERE `taxonomy` = 'fast_category'"; 
        db.query(usernameQuery, (err1, result1) => {        
            if (err1) {
               return res.status(500).json({ message: 'errr5', status :500, msg:err1,wpstatus:0 });
            }
            if (result1.length > 0) { 
            for (var j = 0; j < result1.length; j++){   
               let usernameQuery1 = "SELECT * FROM `wp_terms` WHERE `term_id` = '" + result1[j].term_id + "'";
               db.query(usernameQuery1, (err, result) => {        
                   if (err) {
                      return res.status(500).json({ message: 'errr5', status :500, msg:err,wpstatus:0 });
                   }  
                    for (var i = 0; i < result.length; i++){
                    second_array.push({ term_id:result[i].term_id,name:result[i].name,slug:result[i].slug });  
                    }          
                   final_array.push({ message:"Fetch records", second_array:second_array }); 
                    if(final_array.length ==j){          
                      return res.status(200).json({ status :200, final_array:second_array,wpstatus:1 });
                    }            
               });  
             }     
            } 
            else {      
               return res.status(200).json({  message: 'No record found', status :200,wpstatus:1  }); 
        }
      });
    }, 
 

    taskimgwp:(req, res) =>  {  
      let userid = req.body.userid;
      let email = req.body.email;

      let imageUrl = req.body.file;  
  
        let uploadedFile = req.files.file;
        let fileName = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];   
console.log("file ==",imageUrl)
       // if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {

        uploadedFile.mv(`public/assets/img/${fileName}`, (err ) => {
          if (err) {
              return res.status(500).send(err); 
          } 
          return res.status(200).json({  email:email, userid:userid, fileName:fileName, image:fileName });  
      });


    },




  taskcreatewp:(req, res) => {
    let agent_array = new Array();

let wppostID;
let userid=req.body.userid;
let postcontent=req.body.postcontent;
let posttitle=req.body.posttitle;
let postcat=req.body.postcat;

let commentID;

let Usrauther;
let Usremail;
let Usrurl;
let datecurrent


  let usernameQuery = " SELECT * FROM `wp_users` WHERE `ID` = '" + userid + "'"; 
  db.query(usernameQuery, (err, result) => {        
      if (err) {
         return res.status(500).json({ message: 'errr1', status :500, msg:err, wpstatus:0 });
      }
      if (result.length > 0) {

        Usrauther=result[0].user_nicename;
        Usremail=result[0].user_email;
        Usrurl=result[0].user_url;

    let usernameQuerycat = "SELECT * FROM `wp_termmeta` where term_id='"+postcat+"'"; 
    db.query(usernameQuerycat, (err1, result1) => {        
        if (err1) {
           return res.status(500).json({ message: 'errr2', status :500, msg:err1,wpstatus:0 });
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
        } 
        else {  }
    });



        var now = new Date();
        datecurrent = dateFormat(now, "yyyy-mm-dd HH:MM:ss"); 

         let usernameQuery1 = "INSERT INTO `wp_posts` (`post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`,`post_status`, `comment_status`, `ping_status`,`post_password`, `post_name`, `to_ping`,`pinged`, `post_modified`, `post_modified_gmt`,`post_content_filtered`, `post_parent`, `guid`,`menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES('" + userid + "','" + datecurrent + "','" + datecurrent + "','" + postcontent + "','" + posttitle + "','','publish','open','closed','','" + posttitle + "','','','" + datecurrent + "','" + datecurrent + "','','0','','0','fast_ticket','','1' )";  

         db.query(usernameQuery1, (err1, result1) => {        
             if (err1) {
                return res.status(500).json({ message: 'errr3', status :500, msg:err1, wpstatus:0 });
             }
              wppostID=result1.insertId; 
             
              let usernameQuery101="INSERT INTO `wp_term_relationships` (`object_id`, `term_taxonomy_id`, `term_order`) VALUES('" + wppostID + "','22','0');";
                
              db.query(usernameQuery101, (err4, result4) => {  console.log("success before loop"); }); 

    for(let j = 0;j<agent_array.length;j++){
    let usernameQuery102 ="INSERT INTO `wp_term_relationships` (`object_id`, `term_taxonomy_id`, `term_order`) VALUES('" + wppostID + "','" + agent_array[j] + "','0')";
    db.query(usernameQuery102, (err4, result4) => {  console.log("success in loop "+j); }); 
    }
  
  let usernameQuery103 ="INSERT INTO `wp_term_relationships` (`object_id`, `term_taxonomy_id`, `term_order`) VALUES('" + wppostID + "','" + postcat + "','0')";       

              db.query(usernameQuery103, (err4, result4) => {  console.log("success after loop"); }); 


              let usernameQuery2 = "UPDATE `wp_posts` SET `guid`='https://loginworks.net/portal/my-account/ticket/" + wppostID + "' WHERE ID='" +wppostID + "'";  
              db.query(usernameQuery2, (err2, result2) => {
              if (err2) {
                  return res.status(500).json({ message: 'errr4', status :500, wpstatus:0 });
              }
              var strIP = localStorage.getItem('ipInfo');   
              var strIPClient = JSON.parse(strIP).clientIp; 
              let usernameQuery3 = "INSERT INTO `wp_comments` ( `comment_post_ID`, `comment_author`, `comment_author_email`, `comment_author_url`, `comment_author_IP`, `comment_date`, `comment_date_gmt`, `comment_content`, `comment_karma`, `comment_approved`, `comment_agent`, `comment_type`, `comment_parent`, `user_id`) VALUES ('" +
              wppostID + "', '" + Usrauther + "', '" + Usremail + "', '" + Usrurl + "', '" + strIPClient + "', '" + datecurrent + "', '" + datecurrent + "','"+ postcontent + "', '0', '1', '', '', '0', '" + userid + "')";    
              db.query(usernameQuery3, (err3, result3) => { 
              if (err3) {
                  return res.status(500).json({ message: 'errr5', status :500, wpstatus:0 });
              }
              commentID=result1.insertId; 
              return res.status(200).json({  message: "Your task has been saved successfully.", status :200, wpstatus:1 , commentID:commentID }); 
          }); 
          });     
         });      
      } 
      else {      
         return res.status(200).json({ message: 'you are not authorized to use', status :200,wpstatus:0 });  
  }
});

},




    taskfimgwp:(req, res) =>  { 
      let userid = req.body.userid;
  let uploadedFile = req.files.file;
  let fileName = uploadedFile.name;   
  let commentID= req.body.commentID
  let fileExtension = uploadedFile.mimetype.split('/')[1]; 
 
  //let fileName = randunique()+"."+fileExtension;
  console.log("fff===",uploadedFile) 
  console.log("fileExtension==",fileExtension) 
 // if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
  uploadedFile.mv(`public/assets/img/${fileName}`, (err ) => {
    if (err) {  return res.status(500).json({ message: 'errr5',status :500,msg:err,wpstatus:0 });  }

    var now = new Date();
    datecurrent = dateFormat(now, "yyyy-mm-dd HH:MM:ss"); 
                  let usernameQuery1 = "INSERT INTO `wp_posts` (`post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`,`post_status`, `comment_status`, `ping_status`,`post_password`, `post_name`, `to_ping`,`pinged`, `post_modified`, `post_modified_gmt`,`post_content_filtered`, `post_parent`, `guid`,`menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES('" + userid + "','" + datecurrent + "','" + datecurrent + "','','" + fileName + "','','inherit','open','closed','','" + fileName + "','','','" + datecurrent + "','" + datecurrent + "','','0','http://182.156.204.228:3555/assets/img/"+fileName+"','0','attachment','image/jpg','0' )"; 
      db.query(usernameQuery1, (err1, result1) => {        
      if (err1) { return res.status(500).json({ message: 'errr5', status :500, msg:err1, wpstatus:0 });  }
         let usernameQuery201 = "INSERT INTO `wp_commentmeta` (`comment_id`, `meta_key`, `meta_value`) VALUES('" + commentID + "','_attachments','http://182.156.204.228:3555/assets/img/"+fileName+"')"; 
         db.query(usernameQuery201, (err201, result201) => {        
             if (err201){ return res.status(500).json({ message: 'errr5',status :500,msg:err1,wpstatus:0 }); }
      });
        return res.status(200).json({ userid:userid, fileName:fileName, image:fileName }); 
  });
  
  //return res.status(200).json({ userid:userid, fileName:fileName, image:fileName }); 
  
});

},


};
