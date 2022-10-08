import pino from 'pino';
import pretty from 'pino-pretty';
import dayjs from 'dayjs';

const stream = pretty({
  colorize: true,
});

const logger = pino(
  {
    base: {
      pid: false,
    },
    timestamp: () => `, "time":"${dayjs().format()}"`,
  },
  stream
);

export default logger;
