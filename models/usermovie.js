module.exports = function (sequelize, DataTypes) {
    var UserMovie = sequelize.define("usermovie", {
        watched: {
            type: DataTypes.BOOLEAN,
            defaultValue: false  //defaults to unwatched
        },
        // userID: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // movieID: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        rating: {
            type: DataTypes.INTEGER,
        },
        review: {
            type: DataTypes.TEXT,

        }
    });

    UserMovie.associate = function (models) {
        UserMovie.belongsTo(models.movie, {
            foreignKey: { allowNull: false }
        });
        UserMovie.belongsTo(models.user, {
            foreignKey: { allowNull: false }
        })
    };


    return UserMovie;
}