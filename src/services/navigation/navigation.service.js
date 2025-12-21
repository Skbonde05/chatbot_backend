import NavigationMap from "../../models/NavigationMap.js";

class NavigationService {
  static async findLocation(query) {
    const key = query.toLowerCase().replace(/ /g, "_");

    const result = await NavigationMap.findOne({ key });

    if (!result) return { url: null, message: "Location not found" };

    return { url: result.url };
  }
}

export default NavigationService;
