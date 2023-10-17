import multer from 'multer';
import path from 'path';
import __dirname from '../utils.js';

function uploaderFiles(req, res, next) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const { documentType } = req.body;
      let uploadFolder = "";

      if (documentType === "profile") {
        uploadFolder = path.join('src', 'public', 'profiles');
      } else if (documentType === "product") {
        uploadFolder = path.join('src', 'public', 'products');
      } else if (documentType === "document") {
        uploadFolder = path.join('src', 'public', 'documents');
      } else {
        return cb(new Error("Tipo de documento no válido"));
      }

      cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
  });

  const uploader = multer({ storage: storage });

  uploader.array('documents', 3)(req, res, function (err) {
    if (err) {
      return next(err);
    }
    next();
  });
}

export default uploaderFiles;