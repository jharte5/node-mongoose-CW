const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')


const {
    getAllUsers,
    register,
    login,
    update,
    delete
} = UserController

router.get('/', (req, res) => {
    res.json(users);
});
router.post('/register', register);
router.post('/login',login);
router.put('/updateProfile', update);
// router.delete('delete/Profile', delete);




module.exports = router

// router.get('/',UserController.getAllUsers)



