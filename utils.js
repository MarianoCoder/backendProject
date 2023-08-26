import bcrypt from "bcrypt";
//import jsonwebtoken from "jsonwebtoken";
//import passport from "passport"
import multer from "multer";

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const validatePassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/imgs");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
