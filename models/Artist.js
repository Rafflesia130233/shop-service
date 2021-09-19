const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let artistSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  address: {
    type: String
  },
  avatar: {
    type: String
  },
}, {
    collection: 'artists'
  })

module.exports = mongoose.model('Artist', artistSchema)
