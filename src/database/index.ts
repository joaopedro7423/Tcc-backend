import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      type: process.env.NODE_ENV === 'test' ? 'postgres' : defaultOptions.type,
      database:
        process.env.NODE_ENV === 'test'
          ? 'db_tcc_teste'
          : defaultOptions.database,
    }),
  );
};
