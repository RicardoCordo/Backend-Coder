import { Router } from 'express';
import logger from '../../utils/logger.utils.js'

const router = Router();

router.get('/', (req, res) => {
  logger.fatal('Fatal ');
  logger.error('Error');
  logger.warning('warning');
  logger.info('Info');
  logger.http('Http');
  logger.debug('Debug');
  return res.status(200).json({ status: 'success', message: 'Logs printed' })
});

export default router;