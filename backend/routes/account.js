const { Router } = require("express");
const { User } = require("../db");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware/middleware");
const mongoose = require('mongoose');


const router = Router();

router.get("/test", async (req, res) => {
    res.send("Hello from account router");
})

//route to get balace for a user
router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
})


//route to trandfer money from one user to another
// router.post("/transfer", authMiddleware, async (req, res) => {
//     //input validation
//     const { toUserId, amount } = req.body;
//     if (!toUserId || !amount) {
//         return res.status(400).json({
//             message: "Invalid input"
//         });
//     }
//     //check if user exists
//     const toUser = await User.findOne({
//         _id: toUserId
//     })
//     if (!toUser) {
//         return res.status(404).json({
//             message: "User not found"
//         });
//     }
//     //check if user has enough balance
//     const fromAccount = await Account.findOne({
//         userId: req.userId
//     });
//     if (fromAccount.balance < amount) {
//         return res.status(400).json({
//             message: "Insufficient balance"
//         });
//     }
//     //update balance of both users
//     const fromAccountUpdate = await Account.updateOne({
//         userId: req.userId
//     }, {
//         $inc: { balance: -amount }
//     });
//     if (!fromAccountUpdate) {
//         return res.status(500).json({
//             message: "Failed to update sender's account"
//         });
//     }
//     //add amount to receiver's account
//     const toAccount = await Account.findOneAndUpdate(
//         { userId: toUserId },
//         { $inc: { balance: amount } }// return the updated document
//     );
//     if (!toAccount) {
//         // Rollback the sender's account update if the receiver's account update fails
//         // await Account.updateOne({ userId: req.userId }, { $inc: { balance: amount } });
//         return res.status(500).json({
//             message: "Failed to update receiver's account"
//         });
//     }
//     res.json({
//         message: "Transfer successful"
//     });

// })


// router.post("/transfer", authMiddleware, async (req, res) => {
//     const session = await mongoose.startSession();

//     session.startTransaction();
//     const { amount, to } = req.body;

//     // Fetch the accounts within the transaction
//     const account = await Account.findOne({ userId: req.userId }).session(session);

//     if (!account || account.balance < amount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Insufficient balance"
//         });
//     }

//     const toAccount = await Account.findOne({ userId: to }).session(session);

//     if (!toAccount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Invalid account"
//         });
//     }

//     // Perform the transfer
//     await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//     await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//     // Commit the transaction
//     await session.commitTransaction();
//     res.json({
//         message: "Transfer successful"
//     });
// });


router.post("/transfer", authMiddleware, async (req, res) => {
    const { toUserId, amount } = req.body;

    // Input validation
    if (!toUserId || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Invalid input" });
    }
    if (toUserId === req.userId) {
        return res.status(400).json({ message: "Cannot transfer to self" });
    }

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Check if receiver exists
        const toUser = await User.findOne({ _id: toUserId }).session(session);
        if (!toUser) {
            await session.abortTransaction();
            return res.status(404).json({ message: "User not found" });
        }

        // Check sender's account and balance
        const fromAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Check receiver's account
        const toAccount = await Account.findOne({ userId: toUserId }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Receiver account not found" });
        }

        // Deduct from sender
        const senderUpdate = await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);

        // Add to receiver
        const receiverUpdate = await Account.updateOne(
            { userId: toUserId },
            { $inc: { balance: amount } }
        ).session(session);

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.json({ message: "Transfer successful" });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Transfer failed", error: error.message });
    }
});



module.exports = router;