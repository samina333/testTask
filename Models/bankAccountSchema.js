import mongoose from 'mongoose';

const BankAccountSchema = new mongoose.Schema({
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true }, // Store the full account number securely
    currentBalance: { type: Number, required: true },
    transactions: [
        {
            date: { type: Date, required: true },
            amount: { type: Number, required: true },
            description: { type: String, required: true },
            type: { type: String, enum: ['credit', 'debit'], required: true },
        },
    ],
});

const BankAccount = mongoose.model('BankAccount', BankAccountSchema);

export default BankAccount;