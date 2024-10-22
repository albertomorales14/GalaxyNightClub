const { Router } = require('express');
const router = Router();

const upload = require('../middleware/multerConfig');
const { uploadImage, getImageFromCloudinary } = require('../controller/uploadController');

router.post('/upload', upload.single('image'), uploadImage);

router.route('/cloudinary/image/:id').get(getImageFromCloudinary);

module.exports = router;
