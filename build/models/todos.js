'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = undefined;

var _pgAsync = require('pg-async');

var _pgAsync2 = _interopRequireDefault(_pgAsync);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pgAsync = new _pgAsync2.default(_config.config.dbUri);

var todosConfig = {
    tableName: 'todos'
};

var schema = exports.schema = {
    create: ['CREATE TABLE IF NOT EXISTS TODOS (\n            ID          SERIAL PRIMARY KEY,\n            TITLE       VARCHAR(60),\n            COMPLETED   BOOLEAN\n        );']
};

var todoCrudOps = {
    read: async function read() {
        return pgAsync.query('SELECT * FROM ' + todosConfig.tableName);
    },
    readOne: async function readOne(id) {
        return pgAsync.query('SELECT * FROM ' + todosConfig.tableName + ' WHERE id = $1', id);
    },
    create: async function create(_ref) {
        var title = _ref.title,
            completed = _ref.completed;

        var todo = {
            title: title,
            completed: completed
        };

        return await pgAsync.query('\n            INSERT INTO ' + todosConfig.tableName + ' \n            (title, completed) VALUES ($1, $2)', title, completed);
    },
    update: async function update(id, _ref2) {
        var title = _ref2.title,
            completed = _ref2.completed;

        var query = 'UPDATE ' + todosConfig.tableName + ' SET ';

        if (title != undefined) query += 'title = \'' + title + '\' ';
        if (title != undefined && query != undefined) query += ', ';
        if (completed != undefined) query += 'completed = ' + completed + ' ';
        if (id > 0) query += 'WHERE id = ' + id;

        return pgAsync.query(query);
    },
    delete: async function _delete(id) {
        pgAsync.query('DELETE FROM ' + todosConfig.tableName + ' WHERE id = $1', id);
    }
};

exports.default = todoCrudOps;