require('dotenv').config()
const path = require('path')
const fs = require('fs')


const multer  = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(process.env.FILE_PATH)) {
        fs.mkdirSync(process.env.FILE_PATH);
      }
    } catch (err) {
      cb(err)
      console.error(err);
    }
    cb(null, process.env.FILE_PATH);
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage,
  fileFilter:(req, file, cb)=>{
    if(!file.originalname.match(/\.(js|css|html)$/)){
      cb(new Error('Only html, CSS, JS files are allowed!'))
    }
    else if(file.size > 10 * 1024 * 1024 || file.size < 1024){
      cb(new Error('File Size should be between 1KB and 10MB'))
    }
    else{
      cb(null, true)
    }
  }
});

const uploadMultipleFiles = upload.array('file')
const uploadFiles = async (req, res) => {

  uploadMultipleFiles(req, res, (err)=>{
    if (err instanceof multer.MulterError) {
      return res.status(401).json({message: err.message});
    } else if (err) {
      console.log('sent error message')
      return res.status(401).json({message: err.message});
    }

    console.log('received the files')
    res.status(200).json({message: 'success'})
  })
}

const getFiles = async (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
}

const getSingleFile = async(req, res, next) =>{
  const options = {
      headers:{
          'Content-Disposition': "attachment; filename=" + req.params.filename,
      },
    }
  try{
      const relative_path = path.resolve(__dirname, '../uploads/', req.params.filename)
      await res.download(relative_path, req.params.filename, options)
  } catch(err){
      console.log(err)
      // res.status(404).json({message: err})
  }
  
}

const reDirect = async (req, res, next)=>{
  res.sendFile(path.resolve(__dirname, '../build/', 'index.html'));
}

module.exports = {
  uploadFiles,
  getFiles,
  getSingleFile,
  reDirect
}
