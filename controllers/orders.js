import { getOrders, createOrder, getOrderById, updateOrderById } from "../dao/order.js";
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
  const { products, business: businessId, user: userId, } = body;
  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }
  const business = await getBusinessById(businessId);
  if (!business) {
    throw new NotFoundException("Business not found");
  }
  const total = products.reduce((acc, product)=>{
    return acc + product.price * product.quantity
  }, 0)

    const NewOrder = {
        user: user.id,
        business: business.id,
        products,
        total,
    }

  const order = await createOrder(NewOrder)

  return {
    status: "success",
    payload: order,
  };
};
