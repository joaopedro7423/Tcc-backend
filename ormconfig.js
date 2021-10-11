module.exports = {
  type: process.env.NODE_ENV === 'production'? process.env.DB_DIALECT_PRODUCTION : process.env.DB_DIALECT ,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize:false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: process.env.NODE_ENV !== 'production',
  entities: [
    process.env.NODE_ENV === 'production'
      ? 'build/models/*{.ts,.js}'
      : 'src/models/*{.ts,.js}',
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'build/database/migrations/**/*{.ts,.js}'
      : 'src/database/migrations/**/*{.ts,.js}',
  ],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/subscriber',
  },
};
