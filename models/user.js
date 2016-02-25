import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import when from 'when';
import nodefn from 'when/node';
import db from './db';

export default db.define('user', {
  username: {
    type: Sequelize.STRING(24),
    allowNull: false,
    unique: true,
    comment: 'Username'
  },

  password: {
    type: Sequelize.STRING(100),
    allowNull: false,
    comment: "User's password hash"
  },

  nickname: {
    type: Sequelize.STRING(16),
    unique: true,
    allowNull: false,
    comment: "User's nickname"
  },

  email: {
    type: Sequelize.STRING(48),
    unique: true,
    comment: "User's email"
  }
}, {
  paranoid: true,

  instanceMethods: {
    setPassword: function(password) {
      let self = this;

      return when.promise(async (resolve) => {
        let salt = await nodefn.call(bcrypt.genSalt, 10);

        self.password = await nodefn.call(bcrypt.hash, password, salt);

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
