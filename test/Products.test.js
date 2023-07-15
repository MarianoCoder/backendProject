import mongoose from "mongoose";
import { getProductById, createProduct } from "../dao/product.js";
import Assert from "assert";

mongoose.connect(
  `mongodb+srv://maoaltacba:maoaltacba@cluster0.rqzmcmr.mongodb.net/sessions-test?retryWrites=true&w=majority`
);

const assert = Assert.strict;

describe("Pruebas al modulo de products dao", () => {
  let product;
  before(() => {
    console.log("Antes de todas las pruebas");
    product = createProduct();
  });

  beforeEach(() => {
    console.log("Antes de cada prueba");
    //await
    mongoose.connection.collections.product.drop();
    //this.timeout(5000);
  });

  after(() => {
    console.log("Despues de todas las pruebas");
    mongoose.connection.close();
  });

  afterEach(() => {
    console.log("Despues de cada prueba");
  });

  it("Debe crear un producto de forma existosa", async () => {
    const result = await this.product.create({
      title: "butter",
      description: "excellent butter for all recipes",
      code: 5795,
      price: 15,
      stock: 25,
      category: "cooking",
      thumbnail: "butter.jpg",
    });

    console.log(result);
    assert.ok(result._id);
    assert.strictEqual(Array.isArray(result.product), true);
    assert.deepStrictEqual(result.product, []);
    assert.strictEqual(result.code, 5795);
  });

  it("Debe obtener un producto por código de forma existosa", async () => {
    let result = await this.product.save({
      title: "butter",
      description: "excellent butter for all recipes",
      code: 5795,
      price: 15,
      stock: 25,
      category: "cooking",
      thumbnail: "butter.jpg",
    });
    result = await this.productsDao.getBy({ code: 5795 });

    assert.ok(result._code);
    assert.strictEqual(Array.isArray(result.product), true);
    assert.deepStrictEqual(result.product, []);
    assert.strictEqual(result.code, 5795);
  });
});
