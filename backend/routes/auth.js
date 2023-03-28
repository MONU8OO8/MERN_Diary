const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'monukumarthisjwt';
//Create a User using: POST "/api/auth". Doesn't require auth
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    // username must be an email
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),],
    //make this a async function
    async (req, res) => {
        let success = false;

        // Finds the validation errors in this request and wraps them in an object with handy functions
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check weather the user with this email exist already or not
        try {
            let user = await User.findOne({ success, email: req.body.email });
            // console.log(user)
            if (user) {
                return res.status(400).json({ success, error: "sorry this user already exists" });
            }

            // make salt in password using bcrypt
            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt);
            // create a new user
            user = await User.create({
                name: req.body.Name,
                email: req.body.email,
                password: secpass
            })
            // .then(user => res.json(user))
            // .catch(err =>{console.log(err)
            // res.json({error: 'Please Enter a valid value', message: err.message})})
            // res.json(user)

            // payload
            const data = {
                user: {
                    id: user.id
                }
            }
            
            const Authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, Authtoken })
        } catch (error) {
            console.error(error.message);
            res.status(400).send("server error");
        }

    })


//Route:2 Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    // username must be an email
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists()
],
    //make this a async function
    async (req, res) => {

        let success = false;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                success = false;
                return res.status(400).json({ error: "Please try to login with correct email or password" });
            }

            // compare password
            const passcomp = await bcrypt.compare(password, user.password);
            if (!passcomp) {
                success=true;
                return res.status(400).json({ success, error: "Please try to login with correct email or password" });
            }

            // payload
            const data = {
                user: {
                    id: user.id
                }
            }

            const Authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, Authtoken })
        } catch (error) {
            console.error(error.message);
            res.status(400).send("server error");
        }
    })

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router