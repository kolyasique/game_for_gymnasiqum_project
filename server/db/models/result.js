const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Itemstatus }) {
      Result.belongsTo(User, { foreignKey: 'user_id' });
      Result.hasMany(Itemstatus, { foreignKey: 'result_id' });
    }
  }
  Result.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    total_score: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Result',
  });
  return Result;
};
