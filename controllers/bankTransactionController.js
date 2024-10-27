import bankTransactionModel from "../models/bankTransactionModel.js";
import bankDepositIntoModel from "../models/bankDepositIntoModel.js";
import CashWithdrawfromBankModel from "../models/CashWithdrawfromBankModel.js";
import bankModel from "../models/bankModel.js";
import mongoose from "mongoose";
import { isValidObjectId } from 'mongoose';

export const bankToBankTransferController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {userId, date, contraNo, fromAccount, amount, toAccount } = req.body;

    // Check for required fields
    const requiredFields = ["date", "contraNo", "fromAccount", "amount", "toAccount"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        success: false,
        message: "Required fields are missing",
        missingFields,
      });
    }

    // Validate accounts
    if (fromAccount === toAccount) {
      return res.status(400).send({ success: false, message: "Do not select the same bank account" });
    }

    if (!isValidObjectId(fromAccount) || !isValidObjectId(toAccount)) {
      return res.status(400).send({ success: false, message: "Both fromAccount and toAccount must be valid Object IDs" });
    }

    // Fetch bank account details
    const fromB = await bankModel.findById(fromAccount).session(session);
    const toB = await bankModel.findById(toAccount).session(session);

    if (!fromB) {
      return res.status(404).send({ success: false, message: "fromAccount not found" });
    }
    if (!toB) {
      return res.status(404).send({ success: false, message: "toAccount not found" });
    }

    const amountNum = Number(amount);  // Ensure the amount is a number

    // Check for valid and sufficient balance
    if (amountNum <= 0) {
      return res.status(400).send({ success: false, message: "Amount must be greater than zero" });
    }

    const fromBalanceNum = Number(fromB.openingBalance);
    if (amountNum > fromBalanceNum) {
      return res.status(400).send({ success: false, message: "Insufficient amount in Bank" });
    }

    // Calculate new balances
    const newFromBalance = fromBalanceNum - amountNum;
    const newToBalance = Number(toB.openingBalance) + amountNum;

    // Update balances atomically
    const tr1 = await bankModel.findByIdAndUpdate(
      fromAccount, 
      { openingBalance: newFromBalance }, 
      { new: true, session }
    );

    
    const tr2 = await bankModel.findByIdAndUpdate(
      toAccount, 
      { openingBalance: newToBalance }, 
      { new: true, session }
    );

    if (!tr1 || !tr2) {
      await session.abortTransaction();
      return res.status(400).send({ success: false, message: "Transaction failed" });
    }

    const response = await bankTransactionModel.create({
      admin: userId,
      date,
      contraNo,
      fromAccount,
      amount,
      toAccount,
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction Error:", error);
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};


export const CashDepositeIntoBankController = async (req, res) => {
  try {
    const { userId,date, contraNo, fromAccount, amount, toAccount } = req.body;

    const requiredFields = [
      "date",
      "contraNo",
      "fromAccount",
      "amount",
      "toAccount",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }
    const response = await bankDepositIntoModel.create({
      admin: userId,
      date,
      contraNo,
      fromAccount,
      amount,
      toAccount,
    });

  

    if (response) {
      return res.status(201).send({
        success: true,
        message: "Cash Deposit  Into Bank Successfull",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const CashWithdrawfromBankController = async (req, res) => {
  try {
    const {userId, date, contraNo, fromAccount, amount, toAccount } = req.body;
    
    const requiredFields = [
      "date",
      "contraNo",
      "fromAccount",
      "amount",
      "toAccount",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }
    
    
    const response = await CashWithdrawfromBankModel.create({
      admin: userId,
      date,
      contraNo,
      fromAccount,
      amount,
      toAccount,
    });


    if (response) {
      return res.status(201).send({
        success: true,
        message: "Cash Deposit  Into Bank Successfull",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const getBankToBankTransferById = async (req, res) => {
  try {
    const { _id } = req.params;
    // Use findById to fetch by _id
    const bankTransaction = await bankTransactionModel.find({admin:_id});

    if (!bankTransaction) {
      return res.status(404).json({ success: false, message: "Bank transaction not found" });
    }

    res.status(200).json({message:"Bank transaction found succesfully", success: true, data: bankTransaction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get Cash Deposit Into Bank by ID
export const getCashDepositIntoBankById = async (req, res) => {
  try {
    const { _id } = req.params;
    const cashDeposit = await bankDepositIntoModel.find({admin:_id});
    if (!cashDeposit) {
      return res.status(404).json({ success: false, message: "Cash deposit not found" });
    }
    res.status(200).json({message:"Cash deposit found successfully", success: true, data: cashDeposit });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
// Get Cash Withdraw from Bank by ID
export const getCashWithdrawFromBankById = async (req, res) => {
  try {
    const { _id } = req.params;

    const cashWithdraw = await CashWithdrawfromBankModel.find({admin:_id});

    if (!cashWithdraw) {
      return res.status(404).json({ success: false, message: "Cash withdraw not found" });
    }

    res.status(200).json({message:"Cash withdraw found succesfully", success: true, data: cashWithdraw });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
