import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('database', '', '112233445566', {
  dialect: 'sqlite',
  dialectModulePath: '@journeyapps/sqlcipher',
  storage: '@/instance/db.sqlite',
});

sequelize.query('PRAGMA cipher_compatibility = 3');
sequelize.query("PRAGMA key = '112233445566'");
