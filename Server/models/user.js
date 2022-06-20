const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
	namaLengkap		: { type: String, required: true },
	email 				: { type: String, required: true, lowercase: true, unique: true },
	password 			: { type: String, required: true },
	kodeNoTlp 		: { type: String, default: '+62'},
	noTlp 				: { type: String },
	tglLahir			: { type: Date },
	jenisKelamin	: { type: Number },
	noPegawai			: { type: Number },
	wilayahKerja	: { type: String }, // dirubah ke object id data wilayah kerja
	fungsi				: { type: String }, // dirubah ke object id data fungsi
	jabatan				: { type: String }, // dirubah ke object id data jabatan
	
	foto        	: { type: String },
	delete 				: { type: Boolean },
	createAt 			: { type: Date },
	admin 				: { type: Boolean },

	tokenNotif 		: [{ type: String }],
})

// UserSchema.virtual('biodata', {
//   ref: 'Penduduk',
//   localField: 'nik',
//   foreignField: 'nik',
//   justOne: true
// });
// UserSchema.set('toObject', { virtuals: true });
// UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("User", UserSchema);
