module.exports = function( sequelize, DataTypes ) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING;
    }, {
        classMethods: {
            associate: function( model ) {
                User.hasMany( models.Task );
            }
        }
    });

    return User;
};