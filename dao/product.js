import ProductModel from "./models/product.js";

export const createProduct = (product) => {
  return ProductModel.create(product);
};

export const getProducts = (query) => {
  return ProductModel.find(query);
};

export const getProductById = (id) => {
  return ProductModel.findById(id);
};

export const updateProductById = (id, data) => {
  return ProductModel.updateOne({ _id: id }, data);
};

export const deleteProductById = (id) => {
  return ProductModel.deleteOne({ _id: id });
};
