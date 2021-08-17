"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useUserRoles = _interopRequireDefault(require("./useUserRoles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useAllowed = function useAllowed() {
  for (var _len = arguments.length, requiredRoles = new Array(_len), _key = 0; _key < _len; _key++) {
    requiredRoles[_key] = arguments[_key];
  }

  var roles = (0, _useUserRoles.default)();
  var allowed = (0, _react.useMemo)(function () {
    return roles.some(function (r) {
      return requiredRoles.some(function (a) {
        return a === r;
      });
    });
  }, [roles, requiredRoles]);
  return allowed;
};

var _default = useAllowed;
exports.default = _default;