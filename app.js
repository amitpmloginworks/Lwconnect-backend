const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const fs = require("fs");

var getIP = require('ipware')().get_ip; 
var varyyyy;     
//const {getHomePage} = require('./routes/index'); 
//const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const { getloginwp, getresetwp , testapp } = require('./routes/securitydetail');   
const { taskcatwp } = require('./routes/task'); 
const { mytaskwp, mytaskreplywp, mytasklistwp, tasksrcwp, taskimgwp , taskoncomwp } = require('./routes/task');
const { taskcreatewp, taskfimgwp, taskactivewp } = require('./routes/task');   
const { taskrightside } = require('./routes/task');   
const { taskfeedback, TaskApproveDis } = require('./routes/task'); 

const { dashboardwp, notificationwp } = require('./routes/other');  

const port = 3555;       
var localStorage = require('localStorage')  
var requestIp = require('request-ip');      

//http://10.0.0.67:5000/  pm kill     pm2 delete all or pm2 stop all    pm2 start app.js    
 // chetan.singh userid == 147 
// create connection to database 
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: '67.222.23.104',  
    user: 'pallab_portal',  
    password: '1#ppassword',  
    database: 'pallab_portal'  
}); 

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
        console.error("err connect ==",err);  
    }
    console.log('Connected to database');
});
global.db = db; 

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
//app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
//app.set('view engine', 'ejs'); // configure template engine
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
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});


app.use(function(req, res, next) { 
    var clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1  
    next();
});  

// routes for the app

//app.get('/', getHomePage); 
app.post("/", express.static(path.join(__dirname, "./public"))); 
 
//app.post('/add', getdataall);   
 

app.post('/login', getloginwp); 
   
app.post('/test', testapp); 

app.post('/forgetpass', getresetwp);   

 
//const userRoutes = require('./user'); 
//Routes which handle requests
//app.use('/user',userRoutes);  
 
app.post('/mytask', mytaskwp);


app.post('/mytaskreply',mytaskreplywp);
app.post('/tasklist',mytasklistwp);  
app.post('/tasksrc',tasksrcwp); 
app.post('/taskcat',taskcatwp);  
app.post('/taskcreate',taskcreatewp); 
app.post('/dashboard',dashboardwp);     

app.post('/taskcreateimg',taskfimgwp); 

app.post('/imageUpload',taskimgwp);  

app.post('/taskactive',taskactivewp);  

app.post('/taskoncomp',taskoncomwp);   

app.post('/taskrightside',taskrightside); 

app.post('/taskapprove',TaskApproveDis); 

app.post('/taskfeedback',taskfeedback);
    
app.post('/notification',notificationwp);   




//app.get('/add', addPlayerPage);
//app.get('/edit/:id', editPlayerPage);
//app.get('/delete/:id', deletePlayer);  
//app.post('/edit/:id', editPlayer);

// set the app to listen on the port
app.listen(port, () => {   
    console.log(`Server running on port: http://localhost:${port}`);  
    console.log(`Server running on port: http://182.156.204.228:${port}`);   
});