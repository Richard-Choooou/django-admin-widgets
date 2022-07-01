const gulp = require('gulp') 
const markdownToHtml = require('./gulp/markdown2html.js')
const {view, urls} = require("./templates/py_template.js") 
const Handlebars = require("handlebars") 
const fs = require('fs') 
const path = require('path')
const { rootPath } = require('./define.js')


function markdown() {
    return gulp.src('../packages/**/*.md')
    .pipe(markdownToHtml())
    .pipe(gulp.dest('../templates/preview/'));
}

function genPythonFile() {
	const components = []
	const componentsDir = fs.readdirSync(path.resolve(path.resolve(), "../packages"))
	componentsDir.forEach(dir => {
		const meta = fs.readFileSync(path.resolve(path.resolve(), "../packages/", dir, "meta.json"))
		components.push(JSON.parse(meta.toString()))
	})
	console.log(components)
	const viewTemp = Handlebars.compile(view)
	const viewfile = viewTemp({
		componentsListStr: JSON.stringify(components, null, "    "),
		components: components
	})
	fs.writeFileSync(path.resolve(path.resolve(), "../views.py"), viewfile)

	const urlTemp = Handlebars.compile(urls)

	const urlfile = urlTemp({
		componentsListStr: JSON.stringify(components, null, "    "),
		components: components
	})

	fs.writeFileSync(path.resolve(path.resolve(), "../urls.py"), urlfile)
}

function htmlWidgetTemplate() {
    return gulp.src('../packages/**/*.html')
    .pipe(gulp.dest('../templates/dwc/'));
}

function defaultTask() {
    markdown()
    htmlWidgetTemplate()
	genPythonFile()
    gulp.watch('../packages/**/*.md', markdown);
    gulp.watch('../packages/**/*.html', htmlWidgetTemplate);
}

module.exports.default = defaultTask

// exports.default = defaultTask