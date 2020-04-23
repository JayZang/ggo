import multer = require("multer")

export default function () {
    return multer({ 
        fileFilter: (req, file, cb) => {
            if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype))
                cb(null, true)
            else
                cb(new Error('檔案上傳錯誤，只能上傳圖檔'), false)
        }
    })
}