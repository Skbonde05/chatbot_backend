import PlannerSession from "../../models/PlannerSession.js";
import Product from "../../models/Product.js";
import RecommendationLog from "../../models/RecommendationLog.js";

class ThemePlanner {
  static async start(user, payload) {
    const { eventType = "party", location, timeOfDay } = payload;
    const session = await PlannerSession.create({ userId: user._id, type: "theme" });

    // simple heuristic: eventType decides theme & tags
    const mapping = {
      party: ["decor", "lights", "props"],
      wedding: ["floral", "drapes", "table"],
      photoshoot: ["backdrop", "props"]
    };

    const tags = mapping[eventType] || ["decor"];
    const products = await Product.find({ tags: { $in: tags } }).limit(20);

    await RecommendationLog.create({
      userId: user._id,
      source: "theme_start",
      productIds: products.map(p => p._id),
      metadata: { eventType, location, timeOfDay, sessionId: session._id }
    });

    return { sessionId: session._id, themeTags: tags, suggestions: products.slice(0,8) };
  }

  static async continue(user, payload) {
    const { sessionId, confirmTheme } = payload;
    if (!sessionId) throw new Error("sessionId required");

    if (confirmTheme) {
      // finalize or provide shopping list
      return { message: "Theme confirmed. Generating shopping list..." };
    }
    return { message: "Waiting for confirmation" };
  }
}

export default ThemePlanner;
