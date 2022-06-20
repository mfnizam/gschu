const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermintaanSchema = mongoose.Schema({
  user   			    : { type: Schema.Types.ObjectId, ref: 'User' },
  noSurat         : { type: String },
  permintaan      : { type: Schema.Types.ObjectId, required: true, refPath: 'kategori' },
  kategori        : { type: String, required: true, enum: ['rdp', 'furniture', 'rumput', 'ac', 'atk', 'snack', 'krp', 'mess', 'dokumen', 'galon', 'acara', 'peralatan'] },
	createAt        : { type: Date, default: Date.now },
})

module.exports = mongoose.model("Permintaan", PermintaanSchema);