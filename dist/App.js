"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Auth = _interopRequireDefault(require("./auth/Auth"));

require("./App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  return /*#__PURE__*/_react.default.createElement(_Auth.default, null, /*#__PURE__*/_react.default.createElement("div", null, "test"));
}

var _default = App;
exports.default = _default;