const {Buffer} = require('node:buffer')
const {Transform: TransformStream} = require('node:stream')
const {marked} = require('marked')


module.exports = function gulpMarked(options) {
	if (options) {
		marked.use(options);
	}

	return transformStream({objectMode: true}, async file => {
		if (file.isNull()) {
			return file;
		}

		if (file.isStream()) {
			throw new PluginError('gulp-markdown', 'Streaming not supported');
		}

		try {
			file.contents = Buffer.from(`{% extends "preview/base.html" %}
{% block content %}
    <div class="markdown-body">
        ${marked.parse(file.contents.toString())}
    </div>
{% endblock %}
`);
		} catch (error) {
			throw new PluginError('gulp-markdown', error, {fileName: file.path});
		}

		file.extname = '.html';

		return file;
	});
}



function transformStream(options = {}, transformer, flusher) {
	if (typeof options === 'function') {
		flusher = transformer;
		transformer = options;
	}

	return new TransformStream({
		...options,
		transform(chunk, encoding, callback) {
			(async () => {
				try {
					const value = await transformer(chunk, encoding, this);

					// If the callback throws, we don't want to cause an infinite recursion.
					try {
						callback(undefined, value);
					} catch {}
				} catch (error) {
					callback(error);
				}
			})();
		},
		flush(callback) {
			if (typeof flusher !== 'function') {
				callback();
				return;
			}

			(async () => {
				try {
					for await (const chunk of flusher()) {
						this.push(chunk);
					}

					// If the callback throws, we don't want to cause an infinite recursion.
					try {
						callback();
					} catch {}
				} catch (error) {
					callback(error);
				}
			})();
		},
	});
}

