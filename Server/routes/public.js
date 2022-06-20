const router 		= require('express').Router(),
			ObjectId	= require('mongoose').Types.ObjectId,
			multer 	 	= require('multer'),
			axios 		= require('axios').default,
			FormData	= require('form-data'),
			{ firebase } = require('../firebase/config');

//moduls
const m = require('../module');

// models
const User = require('../models/user'),
			Permintaan = require('../models/permintaan'),
			Rdp = require('../models/kategori/rdp'),
			Furniture = require('../models/kategori/furniture'),
			Rumput = require('../models/kategori/rumput'),
			Ac = require('../models/kategori/ac'),
			Atk = require('../models/kategori/atk'),
			Snack = require('../models/kategori/snack'),
			Krp = require('../models/kategori/krp'),
			Mess = require('../models/kategori/mess'),
			Dokumen = require('../models/kategori/dokumen'),
			Galon = require('../models/kategori/galon'),
			Acara = require('../models/kategori/acara'),
			Peralatan = require('../models/kategori/peralatan');

router.get('/permintaan', async (req, res) => {
	try {
		let	search = req.query.search,
				sort   = req.query.sort || 'createAt',
				order  = req.query.order || 'desc',
				page   = Number(req.query.page),
				size   = Number(req.query.size) || undefined;

		// let permintaan = await m.customModelFindByQueryPopulateLean(Permintaan, {}, ['permintaan']);
		let permintaan = await m.customModelFindByQuerySelectOptionPopulateLean(Permintaan, { }, null, { 
			sort: { [sort]: order == 'asc'? 1 : -1 },
			limit: size
		}, ['permintaan']);
		return res.json({ permintaan })
	} catch (err) {
		return sendError(res, 500, err);
	}
})
router.post('/permintaan/tambah/:kategori', async (req, res) => {
	try {
		// return res.json({ body: req.body })
		let kategori;

		if(req.params.kategori == 'rdp'){
			kategori = await Rdp.create(req.body);
		}else if(req.params.kategori == 'furniture'){
			kategori = await Furniture.create(req.body);
		}else if(req.params.kategori == 'rumput'){
			kategori = await Rumput.create(req.body);
		}else if(req.params.kategori == 'ac'){
			kategori = await Ac.create(req.body);
		}else if(req.params.kategori == 'atk'){
			kategori = await Atk.create(req.body);
		}else if(req.params.kategori == 'snack'){
			kategori = await Snack.create(req.body);
		}else if(req.params.kategori == 'krp'){
			kategori = await Krp.create(req.body);
		}else if(req.params.kategori == 'mess'){
			kategori = await Mess.create(req.body);
		}else if(req.params.kategori == 'dokumen'){
			kategori = await Dokumen.create(req.body);
		}else if(req.params.kategori == 'galon'){
			kategori = await Galon.create(req.body);
		}else if(req.params.kategori == 'acara'){
			kategori = await Acara.create(req.body);
		}else if(req.params.kategori == 'peralatan'){
			kategori = await Peralatan.create(req.body);
		}
		
		let totalPermintaan = await Permintaan.count({});
		let newPermintaan = await Permintaan.create({
			noSurat: String(Number(totalPermintaan) + 1).padStart(4, '0') + '/Prod/' + new Date().getFullYear(),
			user: req.user._id,
			permintaan: kategori._id,
			kategori: req.params.kategori
		})

		return res.json({ permintaan: newPermintaan })
	} catch (err) {
		return sendError(res, 500, err);
	}
})
router.get('/permintaan/detail', async (req, res) => {
	try {
		let permintaan = await m.customModelFindByIdPopulateLean(Permintaan, req.query._id, 'permintaan');
		return res.json({ permintaan })
	} catch (err) {
		return sendError(res, 500, err);
	}
})

router.get('/notifikasi', async (req, res) => {
	return res.json({ permintaan: []})
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