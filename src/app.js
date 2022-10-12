import express from 'express';
import config from 'config';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import logger from '@utils/logger';
import swaggerDocs from '@utils/swagger';
import connect from '@databases';
import authRoute from '@routes/auth.route';
import userRoute from '@routes/user.route';
import conversationExerciseRoute from '@routes/conversation-exercise.route';
import conversationRoute from '@routes/conversation.route';
import messageExerciseRoute from '@routes/message-exercise.route';
import errorMiddleware from '@middlewares/error.middleware';

const port = config.get('port');
const app = express();

/* middlewares */
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

/* routes */
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/conversation-exercise', conversationExerciseRoute);
app.use('/conversation', conversationRoute);
app.use('/message-exercise', messageExerciseRoute);

/* errorMiddleware */
app.use(errorMiddleware);

/* listen */
app.listen(port, async () => {
  logger.info(`App running at ${port}`);
  await connect();
  swaggerDocs(app);
});
