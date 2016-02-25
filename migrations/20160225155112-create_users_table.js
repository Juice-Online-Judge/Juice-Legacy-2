module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: Sequelize.STRING(24),
          unique: true,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        nickname: {
          type: Sequelize.STRING(16),
          unique: true,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(48)
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'created_at'
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'updated_at'
        }
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      }
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
