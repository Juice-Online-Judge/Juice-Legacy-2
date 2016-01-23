import Sequelize from 'sequelize';
import { db } from '../config';

export default new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.adapter,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    underscored: true
  }
});

