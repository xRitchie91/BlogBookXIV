// set up imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// user model
class User extends Model {
  //check passwords
  checkPass(loginPw) {
      // check password for each user
    return bcrypt.compareSync(loginPw, this.password); 
  }
}

// create fields/columns for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // Validate if it is a valid email
      validate: { isEmail: true },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      //make sure password has to be at least 5 char
      validate: { len: [5] },
    },
  },

  {
    hooks: {
      //set up beforeCreate lifecycle hooks functionality

      async beforeCreate(newUser) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      },
      //when we send in an update command
      async beforeUpdate(updatedUser) {
        updatedUser.password = await bcrypt.hash(
          updatedUser.password,
          10
        );
        return updatedUser;
      },
    }, //for bcrypt
    // pass imported sequelize connection 
    sequelize,
    // does not allow auto timestamp
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;