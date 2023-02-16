const config= require('config');
const DB = config.get("DB");
const UserSchema = require('./mongoDB/User');
const { pick } = require('lodash');
const { comparePassword } = require('../helpers/bcrypt');
const { generateAuthToken } = require('../../auth/providers/jwt');
const LoginUserSchema = require('../models/mongoDB/Login');

const getUsers = async () => {
    if(DB === 'mongoDB'){
        try {
            const users = await UserSchema.find({},{password: 0});
            if(!users.length) return ([]);
            return Promise.resolve(users);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const getUser = async (_id) => {
    if(DB === 'mongoDB'){
        try {
            const user = await UserSchema.findById(_id, {password: 0, isAdmin: 0, __v: 0});
            if(!user) throw new Error ('No User Found');
            return Promise.resolve(user);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const loginUser = async ({email, password}) => {
    if(DB === 'mongoDB'){
        try {
            const nowTime = new Date();

            const user = await UserSchema.findOne({email});
            if (!user) throw new Error('Invalid email or Password.');

            const validPassword = comparePassword(password, user.password);
            let counter = await LoginUserSchema.findOne({userId: user._id});

            if(counter){
                if(counter.counter.length === 3){
                    const diff = nowTime - counter.counter[2];
                    const day = 3600 * 1000 * 24;
    
                    if(diff < day) throw new Error(`You need to wait 24 hours to login`);
                    await LoginUserSchema.findByIdAndDelete(counter._id);
                }
            }

            if(!validPassword) {
                if(!counter) {
                    let login = {userId: user._id, counter: [nowTime]};
                    login = new LoginUserSchema(login);
                    await login.save();
                    throw new Error('Invalid email or Password.');
                }

                if(counter.counter.length < 3){
                    counter.counter.push(nowTime);
                    await LoginUserSchema.findByIdAndUpdate(counter._id, {counter: counter.counter});
                    throw new Error('Invalid email or Password.');
                }
            };
            
            const token = generateAuthToken(user);

            if(counter){
                await LoginUserSchema.findByIdAndDelete(counter._id);
            }

            return Promise.resolve(token);
        } catch (error) {
            error.status = 403;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const registerUser = async (normalizeUser) => {
    if(DB === 'mongoDB'){
        try {
            const { email } = normalizeUser;
            let user = await UserSchema.findOne({email});
            if (user) throw new Error('This Email is already registered!');
            user = new UserSchema(normalizeUser);
            user = await user.save();
            user = pick(user, ['name', 'email', '_id']);
            return Promise.resolve(user);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const deleteUser = async (_id) => {
    if(DB === 'mongoDB'){
        try {
            const user = await UserSchema.findByIdAndDelete(_id, {isAdmin:0, password:0});
            if(!user) throw new Error('No User Found!');
            return Promise.resolve(user);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const updateUser = async (_id, _user) => {
    if(DB === 'mongoDB'){
        try {
            const user = await UserSchema.findByIdAndUpdate(_id, _user, {new: true}).select(["-password","-isAdmin","-__v"]);
            if(!user) throw new Error ('No User Found');
            return Promise.resolve(user);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const changeUserBusinessStatus = async (_id_user) => {
    if(DB === 'mongoDB'){
        try {
            let user = await UserSchema.findById(_id_user, {isBusiness: 1, _id: 0} );
            if(!user) throw new Error ('No User Found');
            user = await UserSchema.findByIdAndUpdate(_id_user, {isBusiness: !user.isBusiness}, {new: true}).select(["-password","-isAdmin","-__v"]);
            return Promise.resolve(user);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};


module.exports = { getUsers, getUser, loginUser, registerUser, deleteUser, updateUser, changeUserBusinessStatus };