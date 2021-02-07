var Movie = require("./movie");
var User = require("./user");
var UserMovie = require("./usermovie");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1] }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8, 20] }
        },
        imgURL: {
            type: DataTypes.STRING,
            validate: { isUrl: true }
        }
    });

    // UserMovie.belongsTo(User, {
    //     foreignKey: { allowNull: false }
    // })

    // User.hasMany(UserMovie, {});

    return User;
}