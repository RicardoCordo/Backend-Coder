class ProductDTO {
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.code = product.code;
        this.price = product.price;
        this.status = true;
        this.category = product.category
    }
}

export default ProductDTO;

