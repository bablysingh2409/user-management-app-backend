const express = require('express');
const user = require('../controllers/user');
const verifyUser=require('../middlewares/verifyToken');

const router = express.Router();


router.get('/users/:id',verifyUser,user.getAllUsers);
router.post('/users/:id',verifyUser,user.addUser);
router.get('/users/:userId',verifyUser, user.getUserDetails);
router.put('/users/:userId', user.editUser);
router.delete('/users/:userId', user.deleteUser);

module.exports = router;
