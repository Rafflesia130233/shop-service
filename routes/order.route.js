const express = require('express');
const app = express();
const orderRoute = express.Router();

// Order model
let Order = require('../models/Order');

// Add Order
orderRoute.route('/create').post((req, res, next) => {
  Order.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Orders
orderRoute.route('/').get(async (req, res) => {
  let orders = await Order.find().populate('userId').populate('productId').catch(err => {
    console.log(err);
  });
  console.log(orders);
   res.json(orders);
})

// Get single Order
orderRoute.route('/read/:id').get((req, res) => {
  Order.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Order
orderRoute.route('/update/:id').put((req, res, next) => {
  Order.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Order
orderRoute.route('/delete/:id').delete((req, res, next) => {
  Order.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = orderRoute;
