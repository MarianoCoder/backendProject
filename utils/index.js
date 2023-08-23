import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { faker } from "@faker-js/faker";

export const generateProduct = () => ({
  title: faker.commerce.productName(),
  price: faker.commerce.price(),
  image: faker.image.url(),
  price: parseFloat(faker.commerce.price()),
  stock: parseInt(faker.string.numeric()),
  description: faker.commerce.productDescription(),
  id: faker.database.mongodbObjectId(),
  category: faker.commerce.department(),
});

// JWT DESDE ACA

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const validatePassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

const JWT_SECRET = process.env.JWT_SECRET;

export const tokenGenerator = (user, exp = "24h") => {
  const payload = {
    first_name: user.first_name,
    last_name: user.last_name,
    id: user._id,
    role: user.role,
  };
  const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: exp });
  return token;
};

export const isValidToken = (token) => {
  return new Promise((resolve) => {
    jsonwebtoken.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        console.log("err", error);
        return resolve(false);
      }
      console.log("payload", payload);
      return resolve(payload);
    });
    return token;
  });
};

export const authMiddleware = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, function (error, user, info) {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message: info.message ? info.message : info.toString(),
        });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const authentionMiddleware = (rol) => (req, res, next) => {
  if (req.user.rol !== rol) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};
