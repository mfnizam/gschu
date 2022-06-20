const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OtpSchema = mongoose.Schema({
	email 			: { type: String },
	noTlp 			: { type: String },
	kode 				: { type: Number },
	kadaluarsa 	: { type: Date },
	done 				: { type: Boolean, default: false },
	status 			: { type: Number, default: 0 }, // 0 belum dipakai, 1 sudah dipakai, 2 user minta kirim ulang, 3 tidak terpakai
	keperluan   : { type: Number } // 0 daftar akun, 1 masuk akun, 2 daftar toko, 3 tambah email, 4 edit email, 5 tambah noHp, 6 edit noHp
})

module.exports = mongoose.model("Otp", OtpSchema);