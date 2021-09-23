const express = require('express');
const router = express.Router();

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')

const {registerUser,
    loginUser,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require('./controllers/authcontrollers.js');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),allUsers);
router.route('/admin/user/:id')
        .get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails)
        .put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
        .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)

module.exports = router;