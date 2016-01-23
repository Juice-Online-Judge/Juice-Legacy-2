import Sequelize from 'sequelize';
import db from './db';

export default db.define('user', {
  username: {
    type: Sequelize.STRING(32),
    allowNull: false,
    unique: true,
    comment: 'Username'
  },
  email: {
    type: Sequelize.STRING(32),
    allowNull: false,
    unique: true,
    comment: 'User\'s email'
  },
  password: {
    type: Sequelize.STRING(128),
    allowNull: false,
    comment: 'User\'s password hash'
  }
});
