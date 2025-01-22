import mongoose from 'mongoose';

const TaxSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    currentTax: { type: Number, required: true },
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

const Tax = mongoose.model('Tax', TaxSchema);

export default Tax ;