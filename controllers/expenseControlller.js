import ExpenseModel from "../models/expensesModel.js";

// Create a new expense
export const createExpenseController = async (req, res) => {
  try {
    const {
      userId,
      date,
      expenseNo,
      expenseType,
      paymentType,
      gstType,
      vendor,
      expense,
      amount,
      gstRate,
      cgstAmount,
      sgstAmount,
      igstAmount,
      total,
      narration,
    } = req.body;
  
    const newExpense = await ExpenseModel.create({
      admin:userId,
      date,
      expenseNo,
      expenseType,
      paymentType,
      gstType,
      vendor,
      expense,
      amount,
      gstRate,
      cgstAmount,
      sgstAmount,
      igstAmount,
      total,
      narration,
    });
    return res.status(201).send({
      success: true,
      message: "Expense Created Successfully",
      data: newExpense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

// Get all expenses
export const manageExpenseController = async (req, res) => {
  try {
    const {_id}=req.params;
    const expenses = await ExpenseModel.find({admin:_id});
    if (expenses.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Data found",
        data: expenses,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "No expenses found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

// Delete an expense by ID
export const deleteExpenseController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedExpense = await ExpenseModel.findByIdAndDelete(_id);

    if (!deletedExpense) {
      return res.status(404).send({
        success: false,
        message: "Expense not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Expense deleted successfully",
      data: deletedExpense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

// Update an expense by ID
export const updateExpenseController = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      date,
      expenseNo,
      expenseType,
      gstType,
      paymentType,
      vendor,
      expense,
      amount,
      gstRate,
      cgstAmount,
      sgstAmount,
      igstAmount,
      total,
      narration,
    } = req.body;

    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      _id,
      {
        date,
        expenseNo,
        expenseType,
        gstType,
        vendor,
        expense,
        paymentType,
        amount,
        gstRate,
        cgstAmount,
        sgstAmount,
        igstAmount,
        total,
        narration,
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).send({
        success: false,
        message: "Expense not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
