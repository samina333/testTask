import bcryptjs from 'bcryptjs';
import Model from '../Models/Model';
import awsHandler from './aws';

const userSignUp = (req, res, next) => {
	const { name, password, email, imageUrl, role, bankAccounts } = req.body;
	if (imageUrl !== '' && req.file !== undefined) {
		awsHandler
			.UploadToAws(req.file)
			.then((image) => {
				const query = { email };

				Model.UserModel.findOne(query)
					.then((user) => {
						if (user) {
							if (user.email == email) {
								res.status(400);
								next(new Error('Email Already Taken.'));
							}
						} else {
							bcryptjs.hash(password, 12).then((hashedpassword) => {
								const User = new Model.UserModel({
									name,
									password: hashedpassword,
									email,
									profilePicture: image,
									role: role || 'Freelancer',
									bankAccounts: bankAccounts || [],
									financialOverview: {
										income: { amount: 0, change: 0 },
										expenses: { amount: 0, change: 0 },
										taxes: { amount: 0, change: 0 },
										invoices: { count: 0, change: 0 },
									},
								});
								User.save()
									.then((SavedUser) => {
										console.log(SavedUser);
										return res.status(200).send({
											Message: 'Account Created Successfully.',
											SavedUser,
										});
									})
									.catch((err) => {
										res.status(500);
										next(
											new Error(
												`Unable to Create User. Please Try later. ${err}`,
											),
										);
									});
							});
						}
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
		res.status(500);
		next(new Error('Image is required'));
	}
};

export default userSignUp;
