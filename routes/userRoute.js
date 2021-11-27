import express from 'express';

const router = express.Router();

import { 
    login, 
    signup, 
    updateMe, 
    updatePassword, 
    forgotPassword, 
    resetPassword, 
    getUserList,
    addNewUser,
    updateUser,
    deleteUser 
} from '../controllers/userController.js';
import auth, { uploadUserImage, uploadedUserCloudinary } from '../controllers/middleware.js';

router.post('/login', login);
router.post('/signup', signup);

router.get('/getUsers', getUserList);
router.post('/addNewUser', addNewUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

router.patch('/updateMe', auth, uploadUserImage, uploadedUserCloudinary, updateMe);
router.patch('/updatePassword', auth, updatePassword);

router.patch('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

export default router;