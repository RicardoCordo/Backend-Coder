class CartDTO {
    constructor(products) {
        this.products = products.map(product => ({
            productId: product.productId,
            quantity: product.quantity
        }));
    }
}

export default CartDTO;

