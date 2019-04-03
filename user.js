const express = require('express'); 
const router = express.Router();
const UsersController = require('./routes/task'); 
router.post('/mytask',UsersController.mytaskwp);
module.exports = router; 