let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();


// Multer File upload settings
const DIR = './public/';

// Routes
// router.get('/artists', function(req, res) {
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


// Artist model
let Artist = require('../models/Artist');


// POST Artist
router.post('/create-artist', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const artist = new Artist({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address: req.body.address,
    avatar: url + '/public/' + req.file.filename
  });
  artist.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Artist registered successfully!",
      artistCreated: {
        _id: result._id,
        name: result.name,
        address:result.address,
        avatar: result.avatar
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})


// GET All Artist
router.get("/", (req, res, next) => {
  Artist.find().then(data => {
    res.status(200).json({
      message: "Artists retrieved successfully!",
      artists: data
    });
  });
});


// GET Artist
router.get("/:id", (req, res, next) => {
  Artist.findById(req.params.id).then(data => {
    if (data) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Artist not found!"
      });
    }
  });
});


module.exports = router;
