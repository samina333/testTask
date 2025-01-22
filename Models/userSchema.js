const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		profilePicture: { type: String, default: '' },
		role: { type: String, default: 'Freelancer' },
		password: { type: String, required: true },

		bankAccounts: [{
			bankName: { type: String, required: true },
			accountNumber: { type: String, required: true },
			currentBalance: { type: Number, required: true },
		}],
		
		financialOverview: {
			income: {
				amount: { type: Number, default: 0 },
				change: { type: Number, default: 0 },
			},
			expenses: {
				amount: { type: Number, default: 0 },
				change: { type: Number, default: 0 },
			},
			
			taxes: {
				amount: { type: Number, default: 0 },
				change: { type: Number, default: 0 },
			},
			invoices: {
				count: { type: Number, default: 0 },
				change: { type: Number, default: 0 },
			},
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('User', userSchema);
