const {User} = require('../db') 
const {Account} = require('../db')
const {JWT_SECRET} = require('../config')
const {authMiddleware} = require('../middleware/middleware')

const {Router} =require( 'express')
const zod = require('zod')
const router = Router()
const jwt = require("jsonwebtoken");

const userValidation = zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})//safeparse method

router.get('/test',async (req,res)=>{
    res.send("Hello from user router")

})



router.post('/signup',async (req,res)=>{
    //input validation
    //check another user with same name
    const success = userValidation.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "User already exist"
        })
    }
    //create user
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    // res.json({
    //     message: "User created successfully",
    //     token: token
    // })

    // to simulate account balance creation we can use a dummy value
    const dummyBalance = Math.floor(Math.random() * 10000) + 1; 
    // now we can create an account for the user
    const account = await Account.create({
        userId: userId,
        balance: dummyBalance
    })
    res.json({
        message: "User created successfully",
        token: token,
        account: {
            userId: account.userId,
            balance: account.balance
        }
    })
})


const signinValidation = zod.object({
    username: zod.string(),
    password:zod.string()
})


//signin
router.post('/signin',async (req,res)=>{
    // { success, data, error }
    const {success}  = signinValidation.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user =await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    const userId = user?._id;
    if(user){
        const token =jwt.sign({
            userId: userId
        },JWT_SECRET)
    
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Go to Sign up page"
    })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put('/',authMiddleware,async(req,res)=>{
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    //authMiddleware will check if user is logged in
    //and will add userId to req object
    await User.updateOne({ _id: req.userId }, req.body);
    res.json({
        message: "Updated successfully"
    })
})


router.get('/bulk',async (req,res)=>{
    const name= req.query.filter||""

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": name
            }
        }, {
            lastName: {
                "$regex": name
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})




module.exports = router
