import UserModel from "./models/user.js";

export const createUser = (user) => {
  return UserModel.create(user);
};

export const getUsers = (query) => {
  return UserModel.find(query);
};

export const getUserById = (id) => {
  return UserModel.findById(id);
};

export const updateUserById = (id, data) => {
  return UserModel.updateOne({ _id: id }, data);
};

export const deleteUserById = (id) => {
  return UserModel.deleteOne({ _id: id });
};
