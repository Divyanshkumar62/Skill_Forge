import morgan from 'morgan';
import logger from '../utils/logger';

// Custom morgan stream to use our logger
const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Define custom morgan format for development
const developmentFormat = ':method :url :status :res[content-length] - :response-time ms';

// Define custom morgan format for production
const productionFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

// Determine which format to use based on environment
const format = process.env['NODE_ENV'] === 'production' ? productionFormat : developmentFormat;

// Create morgan middleware
const morganMiddleware = morgan(format, {
  stream,
  skip: (req: any) => {
    // Skip logging for health check endpoints in production
    if (process.env['NODE_ENV'] === 'production') {
      return req.url?.includes('/health') || false;
    }
    return false;
  },
});

export default morganMiddleware;