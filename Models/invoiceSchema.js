import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalInvoices: { type: Number, required: true },
    percentageGrowth: { type: Number, required: true },
    details: [
        {
            status: { type: String, enum: ['paid', 'pending'], required: true },
            amount: { type: Number, required: true },
            date: { type: Date, required: true },
        },
    ],
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);
export default Invoice ;
