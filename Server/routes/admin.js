const router = require('express').Router(),
			mongoose = require('mongoose'),
			ObjectId = require('mongoose').Types.ObjectId;

// Moduls
const m = require('../module');

// Models
const User 	= require('../models/user'),
			Versi 		= require('../models/versi');


router.get('/versi', async (req, res) => {
	try {
		let versi = await m.customModelFindByQueryLean(Versi, { delete: { $in: [null, false] }})
		return res.status(200).json({ versi })
	} catch (err) {
		return sendError(res, 500, 'Terjadi kesalahan, coba lagi.', err);
	}
})
router.post('/versi/tambah', async (req, res) => {
	try {
		let newVersi = new Versi(req.body);	
		let versi = m.generalCreateDoc(newVersi)
		return res.status(200).json({ versi });
	} catch (err) {
		return sendError(res, 500, 'Terjadi kesalahan, coba lagi', err);
	}
})


router.get('/', (req, res) => {
	res.json('incorrect check point')
})

function sendError(res, code, msg, err = null) {
	res.statusMessage = msg;
	return res.status(code).json(err);
}

module.exports = router;