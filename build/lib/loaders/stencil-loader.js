const stencil = require('@stencil/core/compiler')

module.exports = function(content, map, meta) {
    // console.log("=================================")
    // console.log(stencil.transpileSync(content, {
    //     target: "es2020"
    // }).code)
    // console.log("=================================")
    return stencil.transpileSync(content, {
        target: "es2020"
    }).code
};