/**
 * Database Configuration
 * Environment-based database configuration
 */

export const databaseConfig = {
  // Connection settings
  url: process.env.DATABASE_URL,
  directUrl: process.env.DIRECT_URL, // For Prisma Migrate

  // Connection pool settings
  pool: {
    min: parseInt(process.env.DB_POOL_MIN || '2'),
    max: parseInt(process.env.DB_POOL_MAX || '10'),
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
  },

  // Logging
  logging: {
    enabled: process.env.NODE_ENV === 'development',
    queries: process.env.DB_LOG_QUERIES === 'true',
    errors: true,
    warnings: true,
  },

  // Performance
  connectionTimeout: 10000,
  statementTimeout: 60000,

  // Features
  features: {
    softDelete: true,
    timestamps: true,
    paranoid: false,
  },
} as const;

export default databaseConfig;
