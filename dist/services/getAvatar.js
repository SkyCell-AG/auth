"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var avatarKey = 'avatar';

var getAvatar = function getAvatar(token) {
  var oldSrcImage = localStorage.getItem(avatarKey);

  if (oldSrcImage) {
    return Promise.resolve(oldSrcImage);
  }

  return _axios.default.get('https://graph.microsoft.com/v1.0/me/photos/96x96/$value', {
    headers: {
      Authorization: "Bearer ".concat(token),
      'Content-Type': 'application/json'
    },
    responseType: 'arraybuffer'
  }).then(function (arrayBuffer) {
    var image = btoa(new Uint8Array(arrayBuffer.data).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, ''));
    var srcImage = "data:image/jpeg;base64,".concat(image);
    localStorage.setItem(avatarKey, srcImage);
    return srcImage;
  });
};

var _default = getAvatar;
exports.default = _default;