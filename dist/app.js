"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var Table = _interopRequire(require("./Table.js"));

var request = _interopRequire(require("superagent"));

request.get("http://jsonplaceholder.typicode.com/posts").end(function (err, res) {
    React.render(React.createElement(Table, { data: res.body }), document.getElementById("app"));
});