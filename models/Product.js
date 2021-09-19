const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Product = new Schema({
   name: {
      type: String
   },
   description: {
      type: String
   },
   category: {
      type: String
   },
   price: {
      type: Number
   },
   image: {
    type: String,
    required: true
   }
}, {
   collection: 'products'
})

module.exports = mongoose.model('Product', Product)
