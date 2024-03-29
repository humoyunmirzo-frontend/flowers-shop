// Controllers/auth.controller.js

const db = require('../models/index');
const User = db.user;
const bcrypt = require('bcryptjs');

const getRegisterPage = async (req, res) => {
    try {
        res.render('auth/register', {
            title: 'Register'
        });
    } catch (error) {
        console.log(error);
    }
};

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const existUser = await User.findOne({where: {email}})
        if(existUser){
            return res.send('<h1>User has already registered by this email!</h1>')
        }
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPass
        });
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
    }
};

const getLoginPage = async (req, res) => {
    try {
        res.render('auth/login', {
            title: "Login"
        });
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        console.log(user);
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            req.session.isLogged = true;
            req.session.user = user;
            req.session.save(err => {
                if (err) {
                console.log(err);
                return 
            }
            res.redirect('/admin/dashboard');
        });
    } else {
        return res.status(400).send('Incorrect password');

    }
          
        } else   return res.status(400).send('User not found');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

const logout  = async(req, res)=>{
    try {
        req.session.destroy((err) => {
            if (err) throw err
            else res.redirect('/auth/login')
        })
        res.render('auth/login', {
        })    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getRegisterPage,
    registerUser,
    getLoginPage,
    loginUser,
    logout
};
