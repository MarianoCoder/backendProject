import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} from "../dao/order.js";
import { getUserById } from "../dao/user.js";
import { getBusinessById } from "../dao/business.js";
import { NotFoundException } from "../utils/error.js";

export const get = async (query = {}) => {
  const orders = await getOrders(query);
  return {
    status: "success",
    payload: orders,
  };
};

export const create = async (body) => {
  const { products, business: businessId, user: userId } = body;
  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }
  const business = await getBusinessById(businessId);
  if (!business) {
    throw new NotFoundException("Business not found");
  }
  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const newOrder = {
    user: user._id,
    business: business._id,
    products,
    total,
  };

  const order = await createOrder(newOrder);

  return {
    status: "success",
    payload: order,
  };
};

export const getById = async (id) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new NotFoundException("Order not found");
  }
  return {
    status: "success",
    payload: order,
  };
};

export const updateById = async (id, body) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new NotFoundException("Order not found");
  }
  const result = await updateOrderById(id, body);
  return {
    status: "success",
    payload: result,
  };
};

export const removeById = async (id) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new NotFoundException("Order not found");
  }
  const result = await deleteOrderById(id);
  return {
    status: "success",
    payload: result,
  };
};

export const addProduct = async (id, body) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new NotFoundException("Order not found");
  }
  const { products } = body;
  order.products = products;
  await updateOrderById(id, order);
  return {
    status: "success",
    payload: order,
  };
};

export const resolve = async (id, body) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new NotFoundException("order not found");
  }

  const { status } = body;
  order.status = status;
  await updateOrderById(id, order);

  return {
    status: "success",
    payload: order,
  };
};
