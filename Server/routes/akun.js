const router = require('express').Router(),
			jwt = require('jsonwebtoken'),
			secret = require('../secret'),
			ObjectId = require('mongoose').Types.ObjectId;

//moduls
const m = require('../module');

// models
const User = require('../models/user');

router.get('/akun', async (req, res) => {
	try {
		let user = await m.customModelFindByIdPopulate(User, req.user._id, ['agen'])
		return res.json(user);
	} catch (err) {
		return sendError(res, 500, { msg: 'Terjadi kesalahan. Coba beberapa saat lagi.' });
	}
})

router.post('/ubah', async (req, res) => {
	try {
		let user = await m.customModelUpdateByIdPopulateLean(User, req.user._id, {
			...req.body,
			updateAt: new Date()
		}, { new: true }, null);

		delete user.password;
		delete user.__v;
		const accessToken = jwt.sign(user, secret.secretOrKey, {
			expiresIn: 60 * 60 * 24 * 30
		});
		return res.json({ success: true, accessToken: accessToken });	
	} catch (err) {
		return sendError(res, 500, { msg: 'Terjadi kesalahan. Coba beberapa saat lagi.' });
	}

	// try {
	// 	let checkPenumpang = await m.customModelFindOneByQueryLean(Penumpang, { nik: req.body.nik });
	// 	let checkUserPenumpang;
	// 	if(checkPenumpang) {
	// 		checkUserPenumpang = await m.customModelFindOneByQueryLean(User, { penumpang: checkPenumpang._id });
	// 	} else{
	// 		checkPenumpang = await m.generalCreateDoc(new Penumpang({ namaLengkap: req.user.namaLengkap, nik: (req.body.nik || req.user.nik) }))
	// 	}

	// 	let user = await m.customModelUpdateByIdPopulateLean(User, req.user._id, {
	// 		...req.body,
	// 		...checkPenumpang && !checkUserPenumpang? { $push: { penumpang: checkPenumpang }} : {},
	// 		updateAt: new Date()
	// 	}, { new: true }, 'penumpang');

	// 	delete user.password;
	// 	delete user.__v;
	// 	const accessToken = jwt.sign(user, secret.secretOrKey, {
	// 		expiresIn: 60 * 60 * 24 * 30
	// 	});
	// 	return res.json({ success: true, accessToken: accessToken });	

	// } catch (err) {
	// 	return sendError(res, 500, { msg: 'Terjadi kesalahan. Coba beberapa saat lagi.' });
	// }
})

// TODO
// - saat ini tokenNotif berisi array dari sting token notifikasi, ini bertujuan agar akun dapat login lebih dari 1 device dan semuanya mendapatkan notifikasi
// - tapi ketika AUTH menerapkan accessToken, refreshToken dan Refresh Token Rotation maka tidak memungkinkan akun login lebih dari 1 device
router.post('/tokennotif/simpan', async (req, res) => { // firebase registration token
	try {
		let cekTokenNotif = await m.customModelFindOneByQueryLean(User, { _id: req.user._id, tokenNotif: req.body.tokenNotif })
		if(!cekTokenNotif){
			await m.customModelUpdateByIdLean(User, req.user._id, { $push: { tokenNotif: req.body.tokenNotif }})
			return res.json(true);
			
			// let user = await m.customModelUpdateByIdPopulateLean(User, req.user._id, { $push: { tokenNotif: req.body.tokenNotif }}, {}, 'penumpang')
			// delete user.password;
			// delete user.__v;
			// const accessToken = jwt.sign(user, secret.secretOrKey, {
			// 	expiresIn: 60 * 60 * 24 * 30
			// });
			// return res.json({ success: true, accessToken: accessToken });
		}else { 
			return res.json({ success: false, msg: 'Token sudah terdaftar' })
		}
	} catch (err) {
		return sendError(res, 500, { msg: 'Terjadi kesalahan. Coba beberapa saat lagi.' });
	}
})
router.post('/tokennotif/hapus', async (req, res) => { // firebase registration token
	try {
		await m.customModelUpdateByIdLean(User, req.user._id, { $pullAll: { tokenNotif: [req.body.tokenNotif] }})
		return res.json(true);
	} catch (err) {
		return sendError(res, 500, { msg: 'Terjadi kesalahan. Coba beberapa saat lagi.' });
	}
})

router.get('/', (req, res) => {
	res.json('incorrect check point')
})

// format err: { msg: String, field: String }
function sendError(res, code, err = {}) {
	res.statusMessage = err.msg || 'Terjadi kesalahan, coba lagi.';
	res.statusText = err.msg || 'Terjadi kesalahan, coba lagi.';
	return res.status(code).json(err);
}

module.exports = router;