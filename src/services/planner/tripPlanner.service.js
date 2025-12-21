import PlannerSession from "../../models/PlannerSession.js";
import Product from "../../models/Product.js";
import RecommendationLog from "../../models/RecommendationLog.js";

class TripPlanner {
  // start: ask basics or accept initial payload
  static async start(user, payload) {
    // payload can include destination, days, type (beach, city), budget
    const session = await PlannerSession.create({
      userId: user._id,
      type: "trip",
      productId: null
    });

    // simple checklist builder - find items by trip type tags
    const { type = "general", budget } = payload;
    const products = await Product.find({ tags: type }).limit(10);

    await RecommendationLog.create({
      userId: user._id,
      source: "trip_start",
      productIds: products.map(p => p._id),
      metadata: { type, budget, sessionId: session._id }
    });

    return { sessionId: session._id, suggestions: products.slice(0,5), message: "Suggested items for your trip." };
  }

  // continue: accept answers like 'I have a jacket' or 'add item X'
  static async continue(user, payload) {
    const { sessionId, haveItems = [], askFor = 5 } = payload;
    const session = await PlannerSession.findById(sessionId);
    if (!session) throw new Error("Session not found");

    // recommend items not in haveItems
    const products = await Product.find({}).limit(20);
    const filtered = products.filter(p => !haveItems.includes(String(p._id))).slice(0, askFor);

    await RecommendationLog.create({
      userId: user._id,
      source: "trip_continue",
      productIds: filtered.map(p => p._id),
      metadata: { sessionId }
    });

    return { suggestions: filtered, message: "More items you may want." };
  }
}

export default TripPlanner;
