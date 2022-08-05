const express = require('express')
const router = express.Router()

const {
  uploadFiles,
  getFiles,
  getSingleFile,
  reDirect
} = require('../controllers/filesController')

router.route('/').get(getFiles)
router.route('/upload').post(uploadFiles)
router.route('/download/:filename').get(getSingleFile)
router.route('*').get(reDirect)





module.exports = router
