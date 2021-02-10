var UserMovie = require("./usermovie");

module.exports = function (sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: true }
        },
        imdbID: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: true }
        }
    });


    return Movie;
};

