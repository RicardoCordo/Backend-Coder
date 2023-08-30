import ProductDTO from "../DTOs/product.dto.js";
import ProductsDAO from "../dao/mongo/DAO/products.dao.mongo.js";


class ProductsRepository {
  constructor() {
    this.dao = new ProductsDAO();
  }

  async getProducts() {
    try {
      console.log("desde el repository");
      return await this.dao.getProducts();
    } catch (error) {
      throw error;
    }
  }

  async getProduct() {
    try {
      console.log("desde el repository");
      return await this.dao.getProduct();
    } catch (error) {
      throw error;
    }
  }

 

  async createProduct(productInfo) {
    try {
      console.log("desde el repository");
      const newProductInfo = new ProductDTO(productInfo);

      return await this.dao.createProduct(newProductInfo);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productInfo) {
    try {
      console.log("desde el repository");
      const newProductInfo = new ProductDTO(productInfo);
  
      return await this.dao.updateProduct(newProductInfo);
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct() {
    try {
      console.log("desde el repository");
      return await this.dao.deleteProduct();
    } catch (error) {
      throw error;
    }
  }
}




export default ProductsRepository;

