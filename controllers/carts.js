import {
  getCarts,
  createCart,
  getCartById,
  updateCartById,
  deleteCartById,
} from "../dao/cart.js";
import { getUserById } from "../dao/user.js";
import { NotFoundException } from "../utils/error.js";

export const get = async (query = {}) => {
  const carts = await getCarts(query);
  return {
    status: "success",
    payload: carts,
  };
};

export const create = async (body) => {
  const { products, user: userId } = body;
  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }
  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const newCart = {
    user: user._id,
    products,
    total,
  };

  const cart = await createCart(newCart);

  return {
    status: "success",
    payload: cart,
  };
};

export const getById = async (id) => {
  const cart = await getCartById(id);
  if (!cart) {
    throw new NotFoundException("Cart not found");
  }
  return {
    status: "success",
    payload: cart,
  };
};

export const updateById = async (id, body) => {
  const cart = await getCartById(id);
  if (!cart) {
    throw new NotFoundException("Cart not found");
  }
  const result = await updateCartById(id, body);
  return {
    status: "success",
    payload: result,
  };
};

export const removeById = async (id) => {
  const cart = await getCartById(id);
  if (!cart) {
    throw new NotFoundException("Cart not found");
  }
  const result = await deleteCartById(id);
  return {
    status: "success",
    payload: result,
  };
};

export const addProduct = async (id, body) => {
  const cart = await getCartById(id);
  if (!cart) {
    throw new NotFoundException("Cart not found");
  }
  const { products } = body;
  cart.products = products;
  await updateCartById(id, cart);
  return {
    status: "success",
    payload: cart,
  };
};

export const resolve = async (id, body) => {
  const cart = await getCartById(id);
  if (!cart) {
    throw new NotFoundException("Cart not found");
  }

  const { status } = body;
  cart.status = status;
  await updateCartById(id, cart);

  return {
    status: "success",
    payload: cart,
  };
};
