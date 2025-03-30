import { parseEnv } from './env';

// eslint-disable-next-line node/no-process-env
export const env = parseEnv(process.env);
