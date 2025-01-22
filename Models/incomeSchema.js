import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    currentIncome: { type: Number, required: true },
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

const Income = mongoose.model('Income', IncomeSchema);
export default Income;