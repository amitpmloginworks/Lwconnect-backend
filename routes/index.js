
var PasswordHash = require('phpass').PasswordHash;
var passwordHash = new PasswordHash();

module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `wp_users`"; // query database to get all the wp_users

/*
        db.query(query, (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: 'Auth Failed',
                    status:0 
                });
               // res.redirect('/');
            }
            return res.status(200).json({
                message: 'Successfully',
                status :1,  
                data : result,
                datalen:result.length 
            });
            console.log("result==",result);  
            // res.render('index.ejs', {
            //     title: "Welcome to Socka | View Players"
            //     ,players: result
            // });
        });
*/
 
   // execute query
db.query(query, function(err, rows) {
    if (err) {  
        return res.status(500).json({ message: 'errr5', status :500, msg:err });
        console.log("Database error: " + err);
    } else {
         for (var i = 0; i < 2; i++){   
            console.log("Rows[" + i + "] : " + rows[i].user_login + " " + passwordHash.checkPassword('secret',rows[i].user_pass));
         }    
         return res.status(200).json({ message: 'success', status :200, msg:rows });
    }
});



    },
};