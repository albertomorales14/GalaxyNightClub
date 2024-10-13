const { Router } = require('express');
const router = Router();

const upload = require('../Middleware/multerConfig');
const { uploadImage } = require('../controller/uploadController');

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;
