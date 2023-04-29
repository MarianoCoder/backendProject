import ProductModel from "../dao/models/product.js";

class ProductsController {
  static async create(req, res) {
    const { body, file } = req;
    const product = {
      ...body,
      thumbnail: `/static/imgs/${file.originalname}`,
    };
    const result = await ProductModel.create(product);
    res.status(201).json(result);
  }
  static async get(req, res) {
    const result = await ProductModel.find();
    res.status(200).json(result);
  }

  static async getById(req, res) {
    const { params: { id } } = req
    const result = await ProductModel.findById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }

  static async updateById(req, res) {
    const {
      params: { id },
      body,
    } = req;
    await ProductModel.updateOne({ _id: id }, { $set: body });
    res.status(204).end();
  }
  static async deleteById(req, res) {
    const {
      params: { id },
    } = req;
    await ProductModel.deleteOne({ _id: id });
    res.status(204).end();
  }
}

export default ProductsController;
