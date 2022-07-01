const stencil = require('@stencil/core/compiler')

module.exports = function(content, map, meta) {
    return stencil.transpileSync(content, {
        target: "es2020"
    }).code
};