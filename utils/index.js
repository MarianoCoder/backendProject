import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"


// JWT DESDE ACA
const JWT_SECRET = process.env.JWT_SECRET

export const tokenGenerator = (user) => {
  const payload = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
  }
  const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '24h' })
  return token
}

export const isValidToken = (token) => {
  return new Promise((resolve) => {
    jsonwebtoken.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        console.log('err', error)
        return resolve(false)
      }
      console.log('payload', payload)
      return resolve(payload)
    })
    return token
  })
}

// JWT HASTA ACA

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const validatePassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};
