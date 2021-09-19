const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Order = new Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   productId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
   },
   createdOn: {
    type: Date,
    default: Date.now()
  },
  status:{
    type: String,
    default:'Pending'
  }
}, {
   collection: 'orders'
})

module.exports = mongoose.model('Order', Order)
