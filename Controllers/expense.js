import status from 'http-status';
import Model from '../Models/Model';

const getExpenseSummary = async (req, res, next) => {
    try {
        const expense = await Model.ExpenseModel.findOne({ userId: req.user._id });
        if (!expense) {
            return res.status(404).json({ message: 'Expense data not found.' });
        }

        res.status(200).json({
            currentExpense: expense.currentExpense,
            percentageChange: expense.percentageChange,
        });
    } catch (error) {
        next(error);
    }
};

const getExpenseTrends = async (req, res, next) => {
    try {
        const expense = await Model.ExpenseModel.findOne({ userId: req.user._id });
        if (!expense) {
            return res.status(404).json({ message: 'Expense trend data not found.' });
        }

        res.status(200).json({ trends: expense.trends });
    } catch (error) {
        next(error);
    }
};

export default {  getExpenseSummary, getExpenseTrends}