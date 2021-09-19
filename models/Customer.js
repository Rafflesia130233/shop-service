const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Customer = new Schema({
  name: {
    type: String
  },
  gender: {
    type: String
  },
  contact: {
    type: String
  }
}, {
  collection: 'customers'
})

module.exports = mongoose.model('Customer', Customer)
