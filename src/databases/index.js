import mongoose from 'mongoose';
import config from 'config';
import logger from '@utils/logger';

const connect = async () => {
  const dbUri = config.get('dbUri');
  try {
    await mongoose.connect(dbUri);
    logger.info('connected to database');
  } catch (error) {
    logger.error('could not connect to database');
    process.exit(1);
  }
};

export default connect;
