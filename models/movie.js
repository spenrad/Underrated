module.exports = function (sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: true }
        },
        imdbID: {
            type: DataTypes.STRING,
            validate: { notNull: true }
        }
    });
    Movie.associate = function (models) {
        Movie.hasMany(models.UserMovie, {
            // onDelete: "cascade"
        });
    }

    return Movie;
}