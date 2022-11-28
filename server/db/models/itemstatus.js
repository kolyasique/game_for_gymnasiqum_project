const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Itemstatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Item, User }) {
      Itemstatus.belongsTo(Item, { foreignKey: 'item_id' });
      Itemstatus.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Itemstatus.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Items',
        key: 'id',
      },
    },
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Itemstatus',
  });
  return Itemstatus;
};
