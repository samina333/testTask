import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    currentExpense: { type: Number, required: true },
    percentageChange: { type: Number, required: true },
    trends: [
        {
            timeFrame: { type: String, enum: ['monthly', 'quarterly'], required: true },
            data: [
                {
                    monthOrQuarter: { type: String, required: true },
                    amount: { type: Number, required: true },
                },
            ],
        },
    ],
});

const Expense = mongoose.model('Expense', ExpenseSchema);
export default Expense;