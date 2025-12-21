import NLU from "./nlu.service.js";
import PersonalizedRecommender from "../recommender/personalizedRecommender.service.js";
import ChatSession from "../../models/ChatSession.js";
import Message from "../../models/Message.js";

class ChatOrchestrator {

  static async processMessage(userId, text) {

    const intent = NLU.detectIntent(text);

    let reply = "";

    if (intent === "PERSONAL_TRENDING") {
      reply = await PersonalizedRecommender.getTrending(userId);
    } else {
      reply = "I'm still learning! Please ask something else 😊";
    }

    const session = await ChatSession.create({ userId });
    await Message.create({ chatSessionId: session._id, sender: "user", text, intent });

    return { intent, reply };
  }
}

export default ChatOrchestrator;
