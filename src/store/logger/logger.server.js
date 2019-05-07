import log from '../../logger';

// Server side redux action logger
export default function createLogger() {
  // eslint-disable-next-line no-unused-vars
  return store => next => action => {
    log.info({ action });
    return next(action);
  };
}
