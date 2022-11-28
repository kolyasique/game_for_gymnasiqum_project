const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Theme, Itemstatus }) {
      Item.belongsTo(Theme, { foreignKey: 'theme_id' });
      Item.hasMany(Itemstatus, { foreignKey: 'item_id' });
    }
  }
  Item.init({
    theme_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Themes',
        key: 'id',
      },
    },
    question: DataTypes.TEXT,
    answer: DataTypes.TEXT,
    value: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
