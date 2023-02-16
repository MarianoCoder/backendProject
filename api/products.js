class Products {
  constructor() {
    this.products = [];
    this.pid = 0;
  }

  listId(pid) {
    let prod = this.products.find((prod) => prod.pid == pid);
    return prod || { error: "Producto no encontrado" };
  }

  listAll() {
    return this.products.length
      ? this.products
      : { error: "no hay productos cargados" };
  }

  save(prod) {
    prod.pid = ++this.pid;
    this.products.push(prod);
  }

  refresh(prod, pid) {
    prod.pid = Number(pid);
    let index = this.products.findIndex((prod) => prod.pid == pid);
    this.products.splice(index, 1, prod);
  }

  delete(pid) {
    let index = this.products.findIndex((prod) => prod.pid == pid);
    return this.products.splice(index, 1);
  }
}

export default Products;
