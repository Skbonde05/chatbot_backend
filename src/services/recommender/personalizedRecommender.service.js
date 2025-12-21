import Product from "../../models/Product.js";

class PersonalizedRecommender {
  static async getTrending(userId) {
    const products = await Product.find().limit(5); 
    return {
      message: "Here are trending products for you!",
      products
    };
  }
}

export default PersonalizedRecommender;
