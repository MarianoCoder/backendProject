import { getUsers, createUser } from "../dao/user.js";

export const get = async (query = {}) => {
  const users = await getUsers(query);
  return {
    status: "success",
    payload: users,
  };
};

export const create = async (body) => {
  const user = await createUser(body);
  return {
    status: "success",
    payload: user,
  };
};
