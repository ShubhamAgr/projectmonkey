import Redis from 'ioredis';
import { config } from '../utils/config';

const redis = new Redis(config.REDIS_URL);

export default redis;
