export const DATABASE_CONFIG = {
  host: process.env.DATABASE_HOST || '',
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || '',
  port: +process.env.DATABASE_PORT || 5432,
  logging: process.env.DATABASE_LOGGING === 'true' || false,
};
