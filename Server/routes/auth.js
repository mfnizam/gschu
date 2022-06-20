const router = require('express').Router(),
			jwt = require('jsonwebtoken'),
			passport = require('passport'),
			secret = require('../secret');

// TODO
// - penerapan accessToken dan refreshToken
// - rubah jwt sign secret (accessToken dan refreshToken secret harus berbeda)
// - terapkan Refresh Token Rotation

//moduls
const m 	= require('../module');

// models
const Otp = require('../models/otp');
const User = require('../models/user');

router.post('/daftar', async (req, res) => {
	try {
		const namaLengkap = req.body.namaLengkap,
				email = req.body.email,
				password = req.body.password;

		if(!namaLengkap || !email || !password) return res.status(400).json({message: 'Mohon Isikan Nama Lengkap, Email dan Password'});
		
		let user = await m.customModelFindOneByQueryLean(User, { email: email });
		// if(user) return sendError(res, 400, { field: 'email', msg: 'Email sudah terdaftar' });
		if(user) throw { field: 'email', msg: 'Email/Password sudah terdaftar' }


		let newUser = new User({
			namaLengkap: namaLengkap,
			email: email,
			password: await m.generatePassHash(password),
			createAt: new Date()
		})

		user = await newUser.save();
		user = user.toJSON();
		delete user.password;
		delete user.__v;
		const accessToken = jwt.sign(user, secret.secretOrKey, {
			expiresIn: 60 * 60 * 24 * 30
		});
		return res.json({ success: true, accessToken: accessToken });

	} catch (err) {
		return sendError(res, 500, err);
	}
})

router.post('/masuk', async (req, res) => {
	try {
		const email = req.body.email,
				password = req.body.password;

		if(!email || !password) return res.status(401).json({message: 'Mohon Isikan Email dan Password'});

		let user = await m.customModelFindOneByQueryPopulateLean(User, { email: email });
		if(!user) throw { field: 'email', msg: 'Email/Password tidak terdaftar' }
		// if(!user) return sendError(res, 401, { field: 'email', msg: 'Email/Password tidak terdaftar' });
		
		
		let isMatch = await m.comparePassHash(password, user.password);
		if(!isMatch) throw { field: 'password', msg: 'Email/Password tidak terdaftar' }
		// if(!isMatch) return sendError(res, 401, { field: 'password', msg: 'Email/Password tidak terdaftar' });

		delete user.password;
		delete user.__v;
		const accessToken = jwt.sign(user, secret.secretOrKey, {
			expiresIn: 60 * 60 * 24 * 30
		});
		return res.json({ success: true, accessToken: accessToken });

	} catch (err) {
		return sendError(res, 500, err);
	}
})

router.get('/refresh-access-token', passport.authenticate('jwt', { session: false }), (req, res) => {
	let user = req.user.toJSON();
	delete user.password;
	delete user.__v;
	const accessToken = jwt.sign(user, secret.secretOrKey, {
		expiresIn: 60 * 60 * 24 * 30
	});
	return res.json({ success: true, accessToken: accessToken });
})

// format err: { msg: String, field: String }
function sendError(res, code, err = {}) {
	res.statusMessage = err.msg || 'Terjadi kesalahan, coba lagi.';
	res.statusText = err.msg || 'Terjadi kesalahan, coba lagi.';
	return res.status(code).json(err);
}

module.exports = router;