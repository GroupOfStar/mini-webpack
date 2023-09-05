(function (modules) {
    function require(id) {
        console.log('modules :>> ', modules);
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

    require(1)

})(
    {
        1: [function (require, module, exports) {
            // main.js
            const { bar } = require("./bar.js")

            console.log('main.js');
            bar()
        }, { "./bar.js": 2 }],
        2: [function (require, module, exports) {
            // bar.js
            function bar() {
                console.log("bar");
            }

            module.exports = {
                bar
            }
        }, {}]
    }
)
