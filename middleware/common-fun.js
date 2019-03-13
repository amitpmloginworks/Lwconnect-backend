
var crypto = require("crypto");  
var passwordHash1 = require('password-hash');

var sha1 = require('sha1');

var md5sum = crypto.createHash('md5');

var ReverseMd5 = require('reverse-md5') 

  
// not use
var hasher = require('wordpress-hash-node'); 
var PasswordHash = require('phpass').PasswordHash;
var passwordHash = new PasswordHash();
var password = 'abc123';

module.exports = {

    passwordEncrypted : function (password){
        var key = "The@K%&Key!";
        var  cipher=crypto.createCipher('aes192',key);
        var encrypted=cipher.update(password,'utf8','sha1');
        encrypted+=cipher.final('sha1');
        return encrypted;
    },
      
    passwordDecrypted : function (password){
        var key = "The@K%&Key!";
        const decipher=crypto.createDecipher('aes192',key);
        var decrypted=decipher.update(password,'sha1','utf8');
        decrypted+=decipher.final('utf8');
        return decrypted
    },

    sha1algo: function (data) {  
        return crypto.createHash("sha1").update(data, "binary").digest("hex");
        //return crypto.createHash("sha1").update(data,"\xac").digest("hex"); 
    },
    
    hashpassalgo: function (data) {
        //var hashedPassword = passwordHash1.generate('b@123');
       // var hashedPassword = crypto.createHash('md5').update(data).digest('hex');
       // var hashedPassword = sha1("b@123"); 
        //return hashedPassword; 

        var reverseMd5 = ReverseMd5({
            lettersUpper: false,
            lettersLower: true,
            numbers: true,
            special: false,
            whitespace: true,
            maxLen: 12
        });
        let revstring =reverseMd5('762f44c342a9580748ef0cfaa527adf5'); 
        return reverseMd5('762f44c342a9580748ef0cfaa527adf5');

    },
 

    wpencrptpass: function (data) {
        var Wphash = hasher.HashPassword(password);
        var WphashBool = hasher.CheckPassword(password, hash);  
            var PhpPasshash = passwordHash.hashPassword(req.body.number);
            var PhpPasshashBool = passwordHash.checkPassword(password, hash);
       return Wphash; 
    },

    currentdate: function (data) {    
        var dateNow = new Date();
        var dd = dateNow.getDate();
        var monthSingleDigit = dateNow.getMonth() + 1,
            mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
        var yy = dateNow.getFullYear().toString().substr(2);

        return (mm + '/' + dd + '/' + yy);
    }


    /*
    passwordEncrypted : function (password){
        var key = "The@K%&Key!";
        var  cipher=crypto.createCipher('aes192',key);
        var encrypted=cipher.update(password,'utf8','hex');
        encrypted+=cipher.final('hex');
        return encrypted;
    },
      
    passwordDecrypted : function (password){
        var key = "The@K%&Key!";
        const decipher=crypto.createDecipher('aes192',key);
        var decrypted=decipher.update(password,'hex','utf8');
        decrypted+=decipher.final('utf8');
        return decrypted
    },
    */

}