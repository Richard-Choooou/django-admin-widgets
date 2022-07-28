const gulp = require('gulp') 
const markdownToHtml = require('./gulp/markdown2html.js')
const {view, urls, widgetPackage} = require("./templates/py_template.js") 
const Handlebars = require("handlebars") 
const fs = require('fs') 
const path = require('path')
const rename = require("gulp-rename")
const { rootPath } = require('./define.js')

/**
 * 处理markdown文件
 * @returns 
 */
function markdown() {
    return gulp.src('../src/packages/**/*.md')
    .pipe(markdownToHtml())
    .pipe(gulp.dest('../dwc/templates/doc/'));
}

/**
 * 处理 python view url 模板文件
 */
function genPythonFile() {
	const components = []
	const componentsDir = fs.readdirSync(path.resolve(path.resolve(), "../src/packages"))
	componentsDir.forEach(dir => {
		const meta = fs.readFileSync(path.resolve(path.resolve(), "../src/packages/", dir, "meta.json"))
		components.push(JSON.parse(meta.toString()))
	})
	console.log(components)
	const viewTemp = Handlebars.compile(view)
	const viewfile = viewTemp({
		componentsListStr: JSON.stringify(components, null, "    "),
		components: components
	})
	fs.writeFileSync(path.resolve(path.resolve(), "../dwc/views.py"), viewfile)

	const urlTemp = Handlebars.compile(urls)

	const urlfile = urlTemp({
		componentsListStr: JSON.stringify(components, null, "    "),
		components: components
	})

	fs.writeFileSync(path.resolve(path.resolve(), "../dwc/urls.py"), urlfile)

    const widgetInitTemp = Handlebars.compile(widgetPackage)

	const initfile = widgetInitTemp({
		components: components
	})

    if (!fs.existsSync(path.resolve(rootPath, "./dwc/widgets"))) {
        fs.mkdirSync(path.resolve(rootPath, "./dwc/widgets"))
    }

	fs.writeFileSync(path.resolve(path.resolve(), "../dwc/widgets/__init__.py"), initfile)
}

/**
 * 处理 python html 模板文件
 * @returns 
 */
function htmlWidgetTemplate() {
    return gulp.src('../src/packages/**/*.html')
    .pipe(rename(file => {
        file.dirname = path.dirname(file.dirname);
    }))
    .pipe(gulp.dest('../dwc/templates/dwc/'));
}

/**
 * 处理python文件
 * @returns 
 */
// function processPyFile(cb) {
//     gulp.src('../packages/**/*.py')
//     .pipe(rename(file => {
//         file.dirname = path.dirname(file.dirname);
//     }))
//     .pipe(gulp.dest('../widgets/')).on('end', cb);
// }

function build(cb) {
    markdown()
    htmlWidgetTemplate()
    genPythonFile()
    cb()
    // gulp.watch('../packages/**/*.py', processPyFile);
}

function watch() {
    gulp.watch('../src/packages/**/*.md', markdown);
    gulp.watch('../src/packages/**/*.html', htmlWidgetTemplate);
}

module.exports.dev = gulp.parallel(build, watch)

module.exports.build = build

// exports.default = defaultTask