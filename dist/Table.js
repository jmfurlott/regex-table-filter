"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var PureRenderMixin = require("react/addons").addons.PureRenderMixin;

var Immutable = _interopRequire(require("immutable"));

var request = _interopRequire(require("superagent"));

var Table = (function (_React$Component) {
  function Table() {
    _classCallCheck(this, Table);

    this.state = {
      data: Immutable.List(),
      filteredData: Immutable.List() };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  _inherits(Table, _React$Component);

  _createClass(Table, {
    componentWillMount: {
      value: function componentWillMount() {
        this.setState({
          data: Immutable.fromJS(this.props.data).toList(),
          filteredData: Immutable.fromJS(this.props.data).toList()
        });
      }
    },
    filterData: {
      value: function filterData(event) {
        event.preventDefault();
        var regex = new RegExp(event.target.value, "i");
        var filtered = this.state.data.filter(function (datum) {
          return datum.get("title").search(regex) > -1;
        });

        this.setState({
          filteredData: filtered });
      }
    },
    render: {
      value: function render() {
        var filteredData = this.state.filteredData;

        var prettyRows = filteredData.map(function (datum) {
          return React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              datum.get("id")
            ),
            React.createElement(
              "td",
              null,
              datum.get("title")
            )
          );
        });

        return React.createElement(
          "div",
          { className: "Table container" },
          React.createElement(
            "p",
            { style: { padding: "2rem 0 0 0" } },
            "This example shows how to search and filter any generic type of data.  It only matches a pattern using simple case insensitive regular expressions. Thanks to ",
            React.createElement(
              "a",
              { href: "http://jsonplaceholder.typicode.com/posts" },
              "JSON Placeholder"
            ),
            " for example data."
          ),
          React.createElement(
            "p",
            { style: { padding: "0 0 2rem" } },
            "Please view the ",
            React.createElement(
              "a",
              { href: "https://github.com/jmfurlott/regex-table-filter" },
              "Github"
            ),
            " for more information."
          ),
          React.createElement("input", {
            type: "text",
            className: "form-control",
            onChange: this.filterData.bind(this),
            placeholder: "Search" }),
          React.createElement(
            "table",
            { className: "table" },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "th",
                null,
                "ID"
              ),
              React.createElement(
                "th",
                null,
                "Title"
              )
            ),
            React.createElement(
              "tbody",
              null,
              prettyRows
            )
          )
        );
      }
    }
  });

  return Table;
})(React.Component);

module.exports = Table;