import { getUsers, createUser } from "../dao/user.js";

export const get = (query = {}) => {
  const users = getUsers(query);
  return {
    status: "success",
    payload: users,
  };
};

export const create = (body) => {
  const user = createUser(body);
  return {
    status: "success",
    payload: user,
  };
};
