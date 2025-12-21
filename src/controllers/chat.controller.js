import ChatOrchestrator from "../services/chat/chatOrchestrator.service.js";

export const handleMessage = async (req, res) => {
  try {
    const { userId, messageText } = req.body;

    const reply = await ChatOrchestrator.processMessage(userId, messageText);

    res.json({
      success: true,
      data: reply
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
