class NLU {
  static detectIntent(text) {
    text = text.toLowerCase();

    if (text.includes("trending for me")) return "PERSONAL_TRENDING";
    if (text.includes("trip")) return "TRIP_PLANNER";

    return "UNKNOWN";
  }
}

export default NLU;
