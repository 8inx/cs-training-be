import { createConversation } from '@services/conversation.service';

export const createConversationHandler = async (req, res, next) => {
  try {
    const input = req.body;
    const newConversation = await createConversation(input);
    res.status(200).json({ data: newConversation, message: 'create success' });
  } catch (error) {
    next(error);
  }
};
