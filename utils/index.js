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
    id: user._id,
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
