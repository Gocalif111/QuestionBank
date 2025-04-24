const express = require("express");
const router = express.Router();
const paperController = require("../controllers/paperController");
const multer  = require('multer')
const {storage} = require("../config/cloudConfig");
const upload = multer({ storage });
const requireAuth  = require("../middlewares/passportAuth");


router.get("/form",(paperController.uploadForm));

router.post("/new",upload.single('paper'), (paperController.uploadPaper));

router.get("/", requireAuth, (paperController.getPaper));

  module.exports = router;

  