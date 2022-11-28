const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Result, Itemstatus }) {
      User.hasMany(Result, { foreignKey: 'user_id' });
      User.hasMany(Itemstatus, { foreignKey: 'user_id' });
    }
  }
  User.init({
    login: DataTypes.TEXT,
    password: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
