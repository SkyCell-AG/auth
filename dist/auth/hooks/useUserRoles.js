"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useAuth2 = _interopRequireDefault(require("./useAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useUserRoles = function useUserRoles() {
  var _useAuth = (0, _useAuth2.default)(),
      user = _useAuth.user;

  var roles = (0, _react.useMemo)(function () {
    return user && user.role || [];
  }, [user]);
  return roles;
};

var _default = useUserRoles;
exports.default = _default;