class Carts {
  constructor() {
    this.carts = [];
    this.cid = 0;
  }

  listCid(cid) {
    let cart = this.carts.find((cart) => cart.cid == cid);
    return cart || { error: "Carrito no encontrado" };
  }

  listAll() {
    return this.carts.length
      ? this.carts
      : { error: "no hay carritos cargados" };
  }

  save(cart) {
    cart.cid = ++this.cid;
    this.carts.push(cart);
  }

  refresh(cart, cid) {
    cart.cid = Number(cid);
    let index = this.carts.findIndex((cart) => cart.cid == cid);
    this.carts.splice(index, 1, cart);
  }

  delete(cid) {
    let index = this.carts.findIndex((cart) => cart.cid == cid);
    return this.carts.splice(index, 1);
  }
}

export default Carts;
