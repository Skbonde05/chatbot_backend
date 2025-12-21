import PlannerSession from "../../models/PlannerSession.js";
import Product from "../../models/Product.js";
import RecommendationLog from "../../models/RecommendationLog.js";

class GiftPlanner {
  static async start(user, payload) {
    const { age, relation = "friend", interests = [], budget = 1000 } = payload;
    const session = await PlannerSession.create({ userId: user._id, type: "gift" });

    // simple filter: match tags with interests, price <= budget
    const query = { price: { $lte: budget } };
    if (interests.length) query.tags = { $in: interests };

    const products = await Product.find(query).limit(20);

    await RecommendationLog.create({
      userId: user._id,
      source: "gift_start",
      productIds: products.map(p => p._id),
      metadata: { age, relation, interests, budget, sessionId: session._id }
    });

    return { sessionId: session._id, suggestions: products.slice(0,6), message: "Gift suggestions generated" };
  }

  static async continue(user, payload) {
    const { sessionId, pickedId } = payload;
    const session = await PlannerSession.findById(sessionId);
    if (!session) throw new Error("Session not found");

    // if pickedId present, log and return details
    if (pickedId) {
      const product = await Product.findById(pickedId);
      return { message: "You picked a gift", product };
    }
    return { message: "No pick yet" };
  }
}

export default GiftPlanner;
