var WooCommerceAPI = require('woocommerce-api');

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var getIP = require('ipware')().get_ip; 
var varyyyy;   
const { custbyid } = require('./routes/test');    
const port = 4000;    
var localStorage = require('localStorage')
var requestIp = require('request-ip');  


var WooCommerce = new WooCommerceAPI({
  url: 'http://loginworks.net/portal', // Your store URL
  consumerKey: 'ck_fae57cecca0579fe5b09974f96867692282513b1', // Your consumer key
  consumerSecret: 'cs_47db857213272add611727ab048aee19499abb60', // Your consumer secret
  version: 'v3' // WooCommerce API version
});

global.WooCommerce = WooCommerce; 


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client  
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
             
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    } 
    next();
});

app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    varyyyy=ipInfo;
    localStorage.setItem('ipInfo', JSON.stringify(ipInfo)); 
    console.log("ipInfo==",ipInfo);    
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});


app.use(function(req, res, next) { 
    var clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1  
    next();
});  

// routes for the app 
app.get('/test', custbyid);    

// set the app to listen on the port
app.listen(port, () => {   
    console.log(`Server running on port: http://localhost:${port}`);  
});
