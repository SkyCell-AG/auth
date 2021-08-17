"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _AuthContext = _interopRequireDefault(require("../AuthContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useAuth = function useAuth() {
  return (0, _react.useContext)(_AuthContext.default);
};

var _default = useAuth;
exports.default = _default;