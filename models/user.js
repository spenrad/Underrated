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

    User.associate = function (models) {
        User.hasMany(models.UserMovie, {});
    }

    return User;
}