const router = require('express').Router(),
			nodeMailer = require('nodemailer'),
			passport = require('passport'),
			ObjectId = require('mongoose').Types.ObjectId,
			{ firebase } = require('../firebase/config');

// DONE
// - all is async-await

//moduls
const m 	= require('../module');

// models
const Versi			= require('../models/versi'),
			User 			= require('../models/user');

const batasMenitTutupTiket = 1440; //180; // tiket tidak ditampilkan jika 60 menit sebelum berangkat
const batasJamTutupPembelian = 9; // tutup (pembelian tiket besok) pada jam 16.00(09.00 UTC) hari ini

router.get('/testnotif/admin', async (req, res) => {
	try {
		let admin = await m.customModelFindOneByQueryLean(User, { admin: true });
		if(admin?.tokenNotif?.length > 0){
			let notif = await firebase.messaging().sendMulticast({
				tokens: admin.tokenNotif,
				data: {
					channelId: 'pemesanan',
					route: '/transaksi'
				},
				notification: {
					title: 'Test Notifikasi Admin - Server',
					body: 'Ini adalah test notifikasi dari server. Mohon abaikan jika anda menerima notifikasi ini',
				},
				android: {
					priority: 'high',
					notification: {
						// tag: 'transaksi-01294913',
						visibility: 'public',
						channelId: 'pemesanan',
						// imageUrl: 'https://www.layspeed.com/assets/icon-text.png',
						priority: 'max',
						// defaultVibrateTimings: true,
						// defaultSound: true,
						sound: 'default',
					}
				}
			})
			return res.json(notif)
		}else {
			return res.json('Tidak ada data admin')
		}

		// let data = await firebase.messaging().send({
		// 	token: 'dtDnDTgcRMiocGR1yaCHOX:APA91bFLL03znPq-u8SgCk4Gs_2e5hwcuRCWIThIS9mLZ7fBT9_INTBovG6WDYFQifIkVsfJi9WcvJjtKzTw1cRqkXddwA2LpOKnEW_K05rr1BR06nbJyk-p-Nt1mRz2ik3dzbRN1X5Y',
		// 	data: {
		// 		idnotif: 'a22k4h42hkj34kjh'
		// 	}
		// })
		// return res.json(data)

	} catch (err) {
		return res.status(500).json(err)		
	}
})

router.get('/testnotif', async (req, res) => {
	try {
		let notif = await firebase.messaging().send({
			token: 'f0yhmW41T2Cl9I7Ueg583P:APA91bGYunqMQUosB7wXo11WI6iTZ06Wrkx_hmEtoMeZKS-R07Tsz44GLxY6kmlE8hf3Jfnc_SjJxl7AI6wEFBa1URzobm4tUT3UuQ_kNNe2NNakObcESSIxyCPPGWESloTGbsXMcbNu',
			notification: {
				title: 'Test Notifikasi - Server',
				body: 'Ini adalah test notifikasi dari server. Mohon abaikan jika anda menerima notifikasi ini',
			},
			android: {
				notification: {
					tag: 'transaksi-01294913',
					visibility: 'public',
					channelId: 'transaksi',
					// imageUrl: 'https://www.layspeed.com/assets/icon-text.png',
					ticker: 'test ticker'
				}
			}
		})
		return res.json(notif)

		// let data = await firebase.messaging().send({
		// 	token: 'dtDnDTgcRMiocGR1yaCHOX:APA91bFLL03znPq-u8SgCk4Gs_2e5hwcuRCWIThIS9mLZ7fBT9_INTBovG6WDYFQifIkVsfJi9WcvJjtKzTw1cRqkXddwA2LpOKnEW_K05rr1BR06nbJyk-p-Nt1mRz2ik3dzbRN1X5Y',
		// 	data: {
		// 		idnotif: 'a22k4h42hkj34kjh'
		// 	}
		// })
		// return res.json(data)

	} catch (err) {
		return res.status(500).json(err)
	}
})

router.get('/testemail', async (req, res) => {
	let transporter = nodeMailer.createTransport({
		host: 'mail.layspeed.com',
		port: 465,
		secure: true,
		auth: {
				user: 'noreply@layspeed.com',
				pass: '(1layspeednoreply1)'
		}
	});
	let mailOptions = {
		from: '"noreply" <noreply@layspeed.com>', // sender address
		to: 'fatikhunnizam@gmail.com', //req.body.to, // list of receivers
		subject: 'Test', //req.body.subject, // Subject line
		text: 'Test email dari server', //req.body.body, // plain text body
		html: '<b>NodeJS Email Test</b>' // html body
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
		// res.render('index');
	});
})

router.get('/versi', async (req, res) => {
	try {
		let versi = await m.customModelFindOneByQuerySelectOptionLean(Versi, {
			delete: { $in: [null, false] },
			status: true
		}, ['-__v', '-_id'], { sort: '-createAt' });
		return res.status(200).json({ versi })
	} catch (err) {
		return sendError(res, 500, { msg: 'Terjadi kesalahan, coba lagi.' });
	}
})

// format err: { msg: String, field: String }
function sendError(res, code, err = {}) {
	res.statusMessage = err.msg || 'Terjadi kesalahan, coba lagi.';
	res.statusText = err.msg || 'Terjadi kesalahan, coba lagi.';
	return res.status(code).json(err);
}

module.exports = router;