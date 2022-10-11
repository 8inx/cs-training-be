import axios from 'axios';
import config from 'config';

const crispWebsite = config.get('crispWebsite');
const crispIdentifier = config.get('crispIdentifier');
const crispKey = config.get('crispKey');

const baseURL = `https://api.crisp.chat/v1/website/${crispWebsite}/`;
const token = Buffer.from(`${crispIdentifier}:${crispKey}`, 'utf8').toString('base64');

// axios instance
const client = axios.create({
  baseURL,
  headers: {
    Authorization: `Basic ${token}`,
    'X-Crisp-Tier': 'plugin',
  },
});

/**
 * List Conversations
 * @param {{dateStart: string, dateEnd: Date}} input
 * @param {number} page start page
 * @returns {object[]} conversations
 */

export const listConversation = async (input, page = 1) => {
  const { dateStart, dateEnd } = input;

  const params = {
    filter_date_start: new Date(dateStart).toISOString(),
    filter_date_end: new Date(dateEnd).toISOString(),
    filter_resolved: 1,
    filter_unread: 0,
  };

  const results = await client.get(`/conversations/${page}`, { params });
  const conversations = results.data.data.map(conversation => ({
    sessionId: conversation.session_id,
    meta: conversation.meta,
    createdAt: new Date(conversation.created_at).toISOString(),
  }));
  return conversations;
};

/**
 * List Conversation Max
 * @param {{max?:number, dateStart:Date, dateEnd:Date}} input
 * @param {number} page start page
 * @param {array} accumulated initial conversations
 * @returns {object[]}
 */

export const listConversationMax = async (input, page = 1, accumulated = []) => {
  const { max = 20 } = input;
  const crispConversations = await listConversation(input, page);

  if (crispConversations.length === 0 || accumulated.length >= max) {
    return Promise.resolve(accumulated.slice(0, max));
  }
  return listConversationMax(input, page + 1, [...accumulated, ...crispConversations]);
};

/**
 * Get Messages In Conversation
 * @param {string} session_id
 * @returns {object[]}
 */

export const getMessagesInConversation = async session_id => {
  const results = await client.get(`/conversation/${session_id}/messages`);

  const resultsWithSegment = results.data.data.map(
    function (message) {
      // check if new segment
      if (this.lastFrom != 'user' && message.from == 'user') {
        this.segmentIndex++;
      }

      this.lastFrom = message.from;

      return {
        ...message,
        sessionId: message.session_id,
        createdAt: new Date(message.timestamp).toISOString(),
        segmentIndex: this.segmentIndex,
      };
    },
    {
      segmentIndex: 0,
      lastFrom: '',
    }
  );
  return resultsWithSegment;
};

/**
 * Get Messages In Conversation List
 * @param {string[]} session_ids
 * @returns {object[]}
 */
export const getMessagesInConversationList = async session_ids => {
  const promises = session_ids.map(session_id => getMessagesInConversation(session_id));
  const messages = await Promise.all(promises);
  return Array.prototype.concat.apply([], messages);
};
