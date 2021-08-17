"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactQuery = require("react-query");

var _getAvatar = _interopRequireDefault(require("../../services/getAvatar"));

var _useAuth2 = _interopRequireDefault(require("./useAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useUserAvatar = function useUserAvatar() {
  var _useAuth = (0, _useAuth2.default)(),
      microsoftData = _useAuth.microsoftData;

  var token = (0, _react.useMemo)(function () {
    return microsoftData === null || microsoftData === void 0 ? void 0 : microsoftData.access_token;
  }, [microsoftData]);
  var getUserAvatar = (0, _react.useCallback)(function (newToken) {
    return (0, _getAvatar.default)(token);
  }, []);
  var queryResp = (0, _reactQuery.useQuery)('getAvatar', getUserAvatar);
  var refetch = queryResp.refetch;
  (0, _react.useEffect)(function () {
    refetch(token);
  }, [refetch, token]);
  return queryResp;
};

var _default = useUserAvatar;
exports.default = _default;