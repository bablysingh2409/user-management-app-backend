const express = require('express');
const user = require('../controllers/user');

const router = express.Router();


router.get('/users',user.getAllUsers);
router.post('/users',user.addUser);
router.get('/users/:userId', user.getUserDetails);
router.put('/users/:userId', user.editUser);
router.delete('/users/:userId', user.deleteUser);


module.exports = router;
