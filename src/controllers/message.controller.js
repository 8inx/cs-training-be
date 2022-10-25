import { createMessage, createMessageFeedback } from '@services/message.service';

export const createMessageHandler = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const newMessage = await createMessage(userId, req.body);
    res.status(200).json({ data: newMessage, message: 'create success' });
  } catch (error) {
    next(error);
  }
};

export const createMessageFeedbackHandler = async (req, res, next) => {
  try {
    const messageId = req.params.messageId;
    const coachId = req.user._id;
    const input = req.body;
    const updatedMessage = await createMessageFeedback(messageId, coachId, input);
    res.status(200).json({ data: updatedMessage, message: 'feedback success' });
  } catch (error) {
    next(error);
  }
};
