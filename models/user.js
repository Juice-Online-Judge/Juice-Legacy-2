import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import when from 'when';
import nodefn from 'when/node';
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
}, {
  paranoid: true,
  instanceMethods: {
    setPassword: function(password) {
      let self = this;
      return when.promise(async (resolve) => {
        let salt = await nodefn.call(bcrypt.genSalt, 10);
        let encrypted = await nodefn.call(bcrypt.hash, password, salt);
        self.password = encrypted;
        resolve(self);
      });
    },
    verifyPassword: function(password) {
      let self = this;
      return when.promise(async (resolve) => {
        let res = await nodefn.call(bcrypt.compare, password, self.password);
        resolve(res);
      });
    }
  }
});
