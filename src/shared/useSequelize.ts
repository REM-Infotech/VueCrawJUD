/* eslint-disable @typescript-eslint/no-require-imports */
import { join } from "path";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('database', '', '112233445566', {
  dialect: 'sqlite',
  dialectModule: require('@journeyapps/sqlcipher'),
  storage: join(process.cwd(), './src/database/db.sqlite'),
});

sequelize.query('PRAGMA cipher_compatibility = 3');
sequelize.query("PRAGMA key = '112233445566'");
