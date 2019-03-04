
var crypto = require("crypto");

// not use
var hasher = require('wordpress-hash-node'); 
var PasswordHash = require('phpass').PasswordHash;
var passwordHash = new PasswordHash();
var password = 'abc123';

module.exports = {

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

    sha1algo: function (data) {
        //return crypto.createHash("sha1").update(data, "binary").digest("hex");
        return crypto.createHash("sha1").update(data,"\xac").digest("hex"); 
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

}