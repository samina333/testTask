import status from 'http-status';
import Model from '../Models/Model';

const getUserProfile = (req, res, next) => {
	const userId = req.user._id; // Assuming user ID is stored in req.user after authentication
	Model.UserModel.findById(userId)
		.then((user) => {
			if (!user) {
				res.status(404);
				return next(new Error('User not found'));
			}
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500);
			next(new Error(err));
		});
};

const updateUserProfile = (req, res, next) => {
	const userId = req.user._id; // Assuming user ID is stored in req.user after authentication
	const { name } = req.body;
	let updateData = { name };

	if (req.file) {
		awsHandler
			.UploadToAws(req.file)
			.then((imageUrl) => {
				updateData.profilePicture = imageUrl;
				Model.UserModel.findByIdAndUpdate(userId, updateData, { new: true })
					.then((updatedUser) => {
						if (!updatedUser) {
							res.status(404);
							return next(new Error('User not found'));
						}
						res.status(200).json(updatedUser);
					})
					.catch((err) => {
						res.status(500);
						next(new Error(err));
					});
			})
			.catch((err) => {
				res.status(500);
				next(new Error(err));
			});
	} else {
		Model.UserModel.findByIdAndUpdate(userId, updateData, { new: true })
			.then((updatedUser) => {
				if (!updatedUser) {
					res.status(404);
					return next(new Error('User not found'));
				}
				res.status(200).json(updatedUser);
			})
			.catch((err) => {
				res.status(500);
				next(new Error(err));
			});
	}
};

const getBankAccountDetails = async (req, res, next) => {
    try {
        const account = await Model.BankAccountModel.findOne({ _id: req.user.bankAccountId });
        if (!account) {
            return res.status(404).json({ message: 'Bank account not found.' });
        }

        res.status(200).json({
            bankName: account.bankName,
            lastFourDigits: account.accountNumber.slice(-4),
            currentBalance: account.currentBalance,
        });
    } catch (error) {
        next(error);
    }
};

const getBankTransactions = async (req, res, next) => {
    try {
        const account = await Model.BankAccountModel.findOne({ _id: req.user.bankAccountId });
        if (!account) {
            return res.status(404).json({ message: 'Bank account not found.' });
        }

        res.status(200).json({ transactions: account.transactions });
    } catch (error) {
        next(error);
    }
};

const getIncomeSummary = async (req, res, next) => {
    try {
        const income = await Model.IncomeModel.findOne({ userId: req.user._id });
        if (!income) {
            return res.status(404).json({ message: 'Income data not found.' });
        }

        res.status(200).json({
            currentIncome: income.currentIncome,
            percentageChange: income.percentageChange,
        });
    } catch (error) {
        next(error);
    }
};

const getIncomeTrends = async (req, res, next) => {
    try {
        const income = await Model.IncomeModel.findOne({ userId: req.user._id });
        if (!income) {
            return res.status(404).json({ message: 'Income trend data not found.' });
        }

        res.status(200).json({ trends: income.trends });
    } catch (error) {
        next(error);
    }
};
export default {  getUserProfile, updateUserProfile, getBankAccountDetails, getBankTransactions, getIncomeSummary, getIncomeTrends};

