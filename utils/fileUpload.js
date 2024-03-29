const multer = require('multer')
const path = require('path')
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' +  uuid.v4() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits:{fileSize: 10000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})

function checkFileType(file, cb){
    const fileTypes = /jpg|jpeg|png|gif/

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)
    if(mimetype && extname){
        return cb(null, true)
    } else {
        return cb('Error. You can upload only images')
    }
}

module.exports = upload
