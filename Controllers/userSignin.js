import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Model from '../Models/Model';

const createToken = (user, res, next) => {
	const { _id, email, name, profilePicture, role } = user;
	const payload = {
		_id,
		email,
		name,
		profilePicture,
		role,
	};
	console.log(payload);
	jwt.sign(
		payload,
		process.env.JwtSecret,
		{
			expiresIn: '365d',
		},
		(err, token) => {
			if (err) {
				res.status(500);
				next(new Error('Unable to generate Token.'));
			} else {
				res.json({
					token,
				});
			}
		},
	);
};

const userSignIn = (req, res, next) => {
	const { email, password } = req.body;
	Model.UserModel.findOne({ email })
		.select('+password') // Ensure password is selected for comparison
		.then((user) => {
			if (user) {
				bcryptjs.compare(password, user.password).then((result) => {
					if (result) {
						createToken(user, res, next);
					} else {
						res.status(400);
						next(new Error('Invalid Password'));
					}
				});
			} else {
				res.status(400);
				next(new Error('No User Exist With This Email'));
			}
		})
		.catch((err) => {
			res.status(500);
			next(new Error(err));
		});
};
export default userSignIn;
