var Movie = require("./movie");
var User = require("./user");
var UserMovie = require("./usermovie");
var bcrypt = require("bcryptjs");

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
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });

    return User;
}