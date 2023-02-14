class Products {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  listId(id) {
    let prod = this.products.find((prod) => prod.id == id);
    return prod || { error: "Producto no encontrado" };
  }

  listAll() {
    return this.products.length
      ? this.products
      : { error: "no hay productos cargados" };
  }

  save(prod) {
    prod.id = ++this.id;
    this.products.push(prod);
  }

  refresh(prod, id) {
    prod.id = Number(id);
    let index = this.products.findIndex((prod) => prod.id == id);
    this.products.splice(index, 1, prod);
  }

  delete(id) {
    let index = this.products.findIndex((prod) => prod.id == id);
    return this.products.splice(index, 1);
  }
}

export default Products;
