const pluginName = 'webpack-template-plugin';
const path = require('path')
const fs = require('fs')
const Handlebars = require("handlebars") 

class WebpackTemplatePlugin {
    constructor(options) {
        /** @type {HtmlWebpackOptions} */
        this.userOptions = options || {}
    }

    apply(compiler) {
        compiler.hooks.run.tap(pluginName, (compilation) => {
            console.log('webpack 构建正在启动！');
        });

        compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
            console.log('========================== emit ===============================');
            // console.log(compilation.entrypoints)
            const assets = htmlWebpackPluginAssets(compilation, this.userOptions.chunks, '/')
            fs.readFile(this.userOptions.template, 'utf-8',(err, templateStr) => {
                if (err) throw err
                console.log(templateStr)
                const template = Handlebars.compile(templateStr)
                const result = template({
                    css: assets.css.map(val => {
                        return "'" + this.userOptions.publicPath + val + "'"
                    }).join(","),
                    js: assets.js.map(val => {
                        return "'" + this.userOptions.publicPath + val + "'"
                    }).join(",")
                })
                console.log(result)
                compilation.assets[this.userOptions.filename] = {
                    source: function() {
                        return result
                    },
                    size: function() {
                        return result.length
                    }
                }
                callback()
            })
        });
    }
}


function filterChunks(chunks, includedChunks, excludedChunks) {
    return chunks.filter(chunkName => {
        // Skip if the chunks should be filtered and the given chunk was not added explicity
        if (Array.isArray(includedChunks) && includedChunks.indexOf(chunkName) === -1) {
            return false;
        }
        // Skip if the chunks should be filtered and the given chunk was excluded explicity
        if (Array.isArray(excludedChunks) && excludedChunks.indexOf(chunkName) !== -1) {
            return false;
        }
        // Add otherwise
        return true;
    });
}

function urlencodePath (filePath) {
    // People use the filepath in quite unexpected ways.
    // Try to extract the first querystring of the url:
    //
    // some+path/demo.html?value=abc?def
    //
    const queryStringStart = filePath.indexOf('?');
    const urlPath = queryStringStart === -1 ? filePath : filePath.substr(0, queryStringStart);
    const queryString = filePath.substr(urlPath.length);
    // Encode all parts except '/' which are not part of the querystring:
    const encodedUrlPath = urlPath.split('/').map(encodeURIComponent).join('/');
    return encodedUrlPath + queryString;
  }

function htmlWebpackPluginAssets(compilation, entryNames, publicPath) {
    const options = {
        hash: false
    }

    const compilationHash = compilation.hash;
    /**
     * @type {{
        publicPath: string,
        js: Array<string>,
        css: Array<string>
      }}
     */
    const assets = {
        // The public path
        publicPath,
        // Will contain all js and mjs files
        js: [],
        // Will contain all css files
        css: [],
    };


    // Extract paths to .js, .mjs and .css files from the current compilation
    const entryPointPublicPathMap = {};
    const extensionRegexp = /\.(css|js|mjs)(\?|$)/;
    for (let i = 0; i < entryNames.length; i++) {
        const entryName = entryNames[i];
        /** entryPointUnfilteredFiles - also includes hot module update files */
        const entryPointUnfilteredFiles = compilation.entrypoints.get(entryName).getFiles();

        const entryPointFiles = entryPointUnfilteredFiles.filter((chunkFile) => {
            // compilation.getAsset was introduced in webpack 4.4.0
            // once the support pre webpack 4.4.0 is dropped please
            // remove the following guard:
            const asset = compilation.getAsset && compilation.getAsset(chunkFile);
            if (!asset) {
                return true;
            }
            // Prevent hot-module files from being included:
            const assetMetaInformation = asset.info || {};
            return !(assetMetaInformation.hotModuleReplacement || assetMetaInformation.development);
        });

        // Prepend the publicPath and append the hash depending on the
        // webpack.output.publicPath and hashOptions
        // E.g. bundle.js -> /bundle.js?hash
        const entryPointPublicPaths = entryPointFiles
            .map(chunkFile => {
                const entryPointPublicPath = publicPath + urlencodePath(chunkFile);
                return options.hash
                    ? appendHash(entryPointPublicPath, compilationHash)
                    : entryPointPublicPath;
            });

        entryPointPublicPaths.forEach((entryPointPublicPath) => {
            const extMatch = extensionRegexp.exec(entryPointPublicPath);
            // Skip if the public path is not a .css, .mjs or .js file
            if (!extMatch) {
                return;
            }
            // Skip if this file is already known
            // (e.g. because of common chunk optimizations)
            if (entryPointPublicPathMap[entryPointPublicPath]) {
                return;
            }
            entryPointPublicPathMap[entryPointPublicPath] = true;
            // ext will contain .js or .css, because .mjs recognizes as .js
            const ext = extMatch[1] === 'mjs' ? 'js' : extMatch[1];
            assets[ext].push(entryPointPublicPath);
        });
    }
    return assets;
}

module.exports = WebpackTemplatePlugin;