let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();


// Multer File upload settings
const DIR = './public/';

// // Routes
// router.get('/products', function(req, res) {
//   res.send('api works!');
// })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});


// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


// Product model
let Product = require('../models/Product');


// POST Product
router.post('/create-product', upload.single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    image: url + '/public/' + req.file.filename
  });
  product.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Product registered successfully!",
      productCreated: {
        _id: result._id,
        name: result.name,
        description:result.description,
        category:result.category,
        price:result.price,
        image: result.image
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})


// GET All Product
router.get("/", (req, res, next) => {
  Product.find().then(data => {
    res.status(200).json({
      message: "Products retrieved successfully!",
      products: data
    });
  });
});


// GET Product
router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id).then(data => {
    if (data) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Product not found!"
      });
    }
  });
});


module.exports = router;
