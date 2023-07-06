import chai from "chai";
import mongoose from "mongoose";
import { getProductById, createProduct } from "../dao/product.js";
import Product from "../dao/models/product.js";

const expect = chai.expect;

mongoose.connect(
  `mongodb+srv://maoaltacba:maoaltacba@cluster0.rqzmcmr.mongodb.net/sessions-test?retryWrites=true&w=majority`
);

describe("Pruebas al modulo de products dao", () => {
  before(function () {
    console.log("Antes de todas las pruebas");
    this.productsDao = new Product();
  });

  beforeEach(async function () {
    console.log("Antes de cada prueba");
    await mongoose.connection.collections.products.drop();
    this.timeout(5000);
  });

  after(() => {
    console.log("Despues de todas las pruebas");
    mongoose.connection.close();
  });

  afterEach(() => {
    console.log("Despues de cada prueba");
  });

  it("Debe crear un producto de forma existosa", async function () {
    const result = await this.products.save({
      title: "butter",
      description: "excellent butter for all recipes",
      code: 5795,
      price: 15,
      stock: 25,
      category: "cooking",
      thumbnail: "butter.jpg",
    });

    expect.ok(result._id);
    expect.strictEqual(Array.isArray(result.products), true);
    expect.deepStrictEqual(result.products, []);
    expect.strictEqual(result.code, 5795);
  });

  it("Debe obtener un producto por código de forma existosa", async () => {
    let result = await this.productsDao.save({
      title: "butter",
      description: "excellent butter for all recipes",
      code: 5795,
      price: 15,
      stock: 25,
      category: "cooking",
      thumbnail: "butter.jpg",
    });
    result = await this.productsDao.getBy({ code: 5795 });

    expect.ok(result._id);
    expect.strictEqual(Array.isArray(result.products), true);
    expect.deepStrictEqual(result.products, []);
    expect.strictEqual(result.code, 5795);
  });
});
