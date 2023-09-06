(function (modules) {
    function require(id) {
        const [fn, mapping] = modules[id]

        const module = {
            exports: {}
        }

        function localRequire(filePath) {
            const id = mapping[filePath]
            return require(id)
        }

        fn(localRequire, module, module.exports)

        return module.exports
    }

    require(0)
})(
    {
        
            0: [function (require, module, exports) {
                "use strict";

var _bar = require("./bar.js");
var _bar2 = _interopRequireDefault(_bar);
var _user = require("./user.json");
var _user2 = _interopRequireDefault(_user);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
console.log('main.js');
console.log('user :>> ', _user2.default);
(0, _bar2.default)();
            }, {"./bar.js":1,"./user.json":2}],
        
            1: [function (require, module, exports) {
                "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bar;
var _foo = require("foo.js");
var _foo2 = _interopRequireDefault(_foo);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function bar() {
  console.log("bar");
  (0, _foo2.default)();
}
            }, {"foo.js":3}],
        
            2: [function (require, module, exports) {
                "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "{\r\n  \"name\": \"li\",\r\n  \"age\": 28\r\n}\r\n";
            }, {}],
        
            3: [function (require, module, exports) {
                "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = foo;
function foo() {
  console.log("foo");
}
            }, {}],
        
    }
)
