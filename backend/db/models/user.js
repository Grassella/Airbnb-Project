'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Spot, {
        foreignKey: "ownerId",
      });

    //   User.hasMany(models.Booking, {
    //     foreignKey: "userId",
    //   });

    //   User.hasMany(models.Review, {
    //     foreignKey: "userId",
    //   });
   }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (validator.isEmail(value)) {
            throw new Error ('Cannot be an email.')
          }
          },
        },
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60],
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};