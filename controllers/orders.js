import {
  getOrders,
  createOrder,
  updateOrderById,
  getOrderById,
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

  const order = await createOrder({
    user: userId,
    business: businessId,
    products,
    total,
  });

  return {
    status: "success",
    payload: order,
  };
};

export const resolve = async (id, body) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new NotFoundException("Order not found");
  }
  const { status } = body;
  order.status = status;
  await updateOrderById(id, order);

  return {
    status: "success",
    payload: order,
  };
};
