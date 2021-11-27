import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import cloudinary from '../utils/cloudinary.js';


import User from '../models/user.js';

import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Email from '../utils/email.js';


const signToken = (id) => {
    return jwt.sign({ id }, "secret", {
        expiresIn: '2000s'
    })
}

export const login = catchAsync(async (req, res, next) => {
    const { password, email } = req.body;
    if (!password || !email) {
        return next(new AppError("Please Provide Email or Password", 400));
    }

    const oldUser = await User.findOne({ email });
    if (!oldUser) {
        return next(new AppError("Email is wrong", 400));
    }
    if (oldUser.status == 1) {
        return next(new AppError("You are not actived", 400))
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

    if (!isPasswordCorrect) {
        return next(new AppError("password is wrong", 400));
    }

    const token = signToken(oldUser._id);

    res.status(200).json({
        userData: oldUser,
        token
    })


})

export const signup = catchAsync(async (req, res, next) => {
    const { firstName, lastName, name, email, password, confirmPassword } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return next(new AppError("User is already registered", 400));
    }

    if (password !== confirmPassword) {
        return next(new AppError("Password in not same", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    var role
    if ((await User.find()).length === 0) {
        role = 1
    } else {
        role = 3
    }
    const user = await User.create({
        firstName,
        lastName,
        name,
        email,
        password: hashedPassword,
        role

    });

    const token = signToken(user._id);

    res.status(200).json({ userData: user, token });

});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};


export const updateMe = catchAsync(async (req, res, next) => {
    const filteredBody = filterObj(req.body, 'firstName', "lastName", 'email','birthday', 'gender', 'passportNo', 'phoneNo','center','ReceivedSample','ValidTime');
    if (req.file) {
        filteredBody.userImage = req.result.secure_url;
        filteredBody.cloudinary_id = req.result.public_id;
    }

    const user = await User.findById(req.userId);

    if (req.file && user.cloudinary_id) {
        await cloudinary.uploader.destroy(user.cloudinary_id);
    }

    filteredBody.name = filteredBody.firstName + ' ' + filteredBody.lastName;
    switch (filteredBody.gender) {
        case "10":
            filteredBody.gender = 'Male';
            break;
        case "20":
            filteredBody.gender = 'Female';
            break;
        default:
            break;
    }
    switch (filteredBody.center) {
        case "10":
            filteredBody.center = 'Medical center1';
            break;
        case "20":
            filteredBody.center = 'Medical center2';
            break;
        case "30":
            filteredBody.center = 'Medical center3';
            break;
        case "40":
            filteredBody.center = 'Medical center4';
            break;
        default:
            break;
    }
    const updatedUser = await User.findByIdAndUpdate(req.userId, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ userData: updatedUser });
})

export const updatePassword = catchAsync(async (req, res, next) => {
    const { passwordCurrent, password, confirmPassword } = req.body;

    const oldUser = await User.findById(req.userId);

    const isPasswordCorrect = await bcrypt.compare(passwordCurrent, oldUser.password)

    if (!isPasswordCorrect) {
        return next(new AppError("Current password is wrong", 400));
    }

    if (password !== confirmPassword) return next(new AppError("Passwords and confirm password are not the same", 400));

    const hashedPassword = await bcrypt.hash(password, 12);

    oldUser.password = hashedPassword;
    oldUser.save();

    const token = signToken(req.userId);

    res.status(200).json({ userData: oldUser, token });

})

export const forgotPassword = catchAsync(async (req, res, next) => {
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("There is no user with email address", 404));
    }
    
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    let resetURL;
    if (process.env.NODE_ENV !== 'production')
        resetURL = `http://localhost:3000/user/resetPassword/${resetToken}`;
    else
        resetURL = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`;
    // console.log("email:",user);
    try {
        await new Email(user, resetURL).sendPasswordReset();

        // await sendEmail({
        //     email: user.email,
        //     subject: 'Your password reset token (valid for 10 min',
        //     message
        // });

        res.status(200).json({
            status: 'success',
            message: 'Token send to email'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error sending the email. Try again later!', 500)
        );
    }
})

export const resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new AppError('password and confirm password are not the same', 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedPassword;
    user.save();

    const token = signToken(req.userId);

    res.status(200).json({ token });
});

export const getUserList = catchAsync(async (req, res, next) => {
    const users = await User.find();
    if (users.length) {
        res.send(users);
    } else {
        res.send('server error');
    }
})

export const addNewUser = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const user = await User.create(req.body);
    const hashedPassword = await bcrypt.hash('123456', 12);
    user.password = hashedPassword;
    user.save();
    if (user) {
        res.send('success');
    } else {
        res.send('server error');
    }
})

export const updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.param('id'), req.body);
    if (user) {
        res.send('success');
    } else {
        res.send('server error');
    }
})

export const deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.param('id'));
    if (user) {
        res.send('success');
    } else {
        res.send('server error');
    }
})