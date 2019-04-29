import bunyan from 'bunyan';
import bunyanExpressSerializer from 'bunyan-express-serializer';
import config from './config';

// eslint-disable-next-line new-cap
const logger = new bunyan.createLogger({
  name: 'crosslist',
  serializers: {
    req: bunyanExpressSerializer,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  streams: [
    {
      ...config.log,
      stream: process.stdout,
    },
  ],
});

export default logger;
