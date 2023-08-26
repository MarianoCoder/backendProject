import CartModel from "./models/cart.js";

export const createCart = (cart) => {
  return CartModel.create(cart);
};

export const getCarts = (query) => {
  return CartModel.find(query);
};

export const getCartById = (id) => {
  return CartModel.findById(id);
};

export const updateCartById = (id, data) => {
  return CartModel.updateOne({ _id: id }, data);
};

export const deleteCartById = (id) => {
  return CartModel.deleteOne({ _id: id });
};
