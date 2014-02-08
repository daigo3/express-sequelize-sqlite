// データベースへの接続とモデルの定義

var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    _ = require('lodash');

var sequelize = new Sequelize('sequelize_test', null, null),
    db = {};

fs.readdirsync(__dirname)
    .filter( function(file) {
        return( file(indexOf('.') !== 0) && file !== 'index.js' );
    })
    .forEach(function(file) {
        var model = sequelize.import( path.join(__dirname, file) );
        db[model.name] = model;
    });

Object.keys(db).forEach( function(modelName) {
    if( 'associate' in db[modelName] ) {
        db[modelName].associate(db);
    }
});

module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);