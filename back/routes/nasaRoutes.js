const express = require("express");
const router = express.Router();
const nasaController = require('../controllers/nasaController');

router.get('/', nasaController.getImageByNasaId);

module.exports = router;
