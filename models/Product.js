// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // defines an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true,
    },
    //defines product name
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //defines price
    price: {
      // Decimal
      type: DataTypes.DECIMAL(10,2),
      // Doesn't allow null values
      allowNull: false,
      // Validates that the value is a decimal
      validate: {
        isDecimal:true
      },
    },
    //defines stock
    stock: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // Doesn't allow null values
      allowNull: false,
      // default value of 10
      defaultValue: 10,
      //value is numeric
      validate: {
        isNumeric: true,
      },
    },
    //defines category id
    category_id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      //References the category model's id
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
