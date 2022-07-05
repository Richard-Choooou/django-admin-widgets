const fs = require("fs")
const { rootPath } = require("../define")
const path = require("path")

exports.getComponents = () => {
    return fs.readdirSync(path.resolve(rootPath, "./packages"))
}