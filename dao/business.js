import BusinessModel from "./models/business.js";

export const createBusiness = (business) => {
  return BusinessModel.create(business);
};

export const getBusinesses = (query) => {
  return BusinessModel.find(query);
};

export const getBusinessById = (id) => {
  return BusinessModel.findById(id);
};

export const updateBusinessById = (id, data) => {
  return BusinessModel.updateOne({ _id: id }, data);
};

export const deleteBusinessById = (id) => {
  return BusinessModel.deleteOne({ _id: id });
};
