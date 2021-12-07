
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


//create user model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and configuration
User.init(
    {
        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the password must be atleast four characters long
                len: [4]
            }
        }
    },
    {
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
        },
        // set up beforeUpdate lifecycle "hook" functionality
        async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
    }
},

    sequelize,
    
    timestamps: false,
    
    freezeTableName: true,

    underscored: true,

    modelName: 'user'

    }
    
);
module.exports = User;