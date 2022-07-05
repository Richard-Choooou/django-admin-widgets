const stencil = require('@stencil/core/compiler')

module.exports = function(content, map, meta) {
    // console.log("=================================")
    // console.log(content)
    // console.log("=================================")
    return "export default `"+ content + "`"
};