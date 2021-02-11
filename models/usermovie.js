var Movie = require("./movie");
var User = require("./user");

module.exports = function (sequelize, DataTypes) {

    var UserMovie = sequelize.define("UserMovie", {
        watched: {
            type: DataTypes.BOOLEAN,
            defaultValue: false  //defaults to unwatched
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        review: {
            type: DataTypes.TEXT,

        }
    });

    UserMovie.associate = (models) => {

        models.Movie.hasMany(models.UserMovie, {
            as: 'UserMovies', foreignKey: 'movieID'
        });

        models.UserMovie.belongsTo(models.Movie, {
            foreignKey: 'movieID'
        });

        models.User.hasMany(models.UserMovie, {
            as: 'UserMovies', foreignKey: 'userID'
        });

        models.UserMovie.belongsTo(models.User, {
            foreignKey: 'userID'
        });
    }

    return UserMovie;
}