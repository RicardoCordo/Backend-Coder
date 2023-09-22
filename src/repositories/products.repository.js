import ProductDTO from "../DTOs/product.dto.js";
import ProductsDAO from "../dao/mongo/DAO/products.dao.mongo.js";
import logger from "../utils/logger.utils.js";


class ProductsRepository {
  constructor() {
    this.dao = new ProductsDAO();
  }

  async getProducts() {
    try {
      logger.info("desde el repository");
      return await this.dao.getProducts();
    } catch (error) {
      logger.error (error);
    }
  }

  async getProduct(id) {
    try {
      logger.info("desde el repository");
      return await this.dao.getProduct(id);
    } catch (error) {
      logger.error (error);
    }
  }

 

  async createProduct(productInfo) {
    try {
      logger.info("desde el repository");
      const newProductInfo = new ProductDTO(productInfo);
      return await this.dao.createProduct(newProductInfo);
    } catch (error) {
      logger.error (error);
    }
  }

  async updateProduct(productInfo) {
    try {
      logger.info("desde el repository");
      const newProductInfo = new ProductDTO(productInfo);
  
      return await this.dao.updateProduct(newProductInfo);
    } catch (error) {
      logger.error (error);
    }
  }
  async deleteProduct(id) {
    try {
      logger.info("desde el repository");
      return await this.dao.deleteProduct(id);
    } catch (error) {
      logger.error (error);
    }
  }
}




export default ProductsRepository;

