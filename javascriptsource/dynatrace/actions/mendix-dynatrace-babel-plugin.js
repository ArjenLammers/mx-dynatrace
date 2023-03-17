module.exports = () => ({
  visitor: {
    ImportDeclaration: function (path, state) {
	  let filename = state.file.opts.filename;
	  if (filename.match(/^.*[\/\\](node_modules)[\/\\](mendix)[\/\\][a-zA-Z0-9]*(.js)$/g) && !filename.endsWith("native.js")) {
		  // if (path.node.source.value === 'react/jsx-runtime') {
			// console.log(path.node.specifiers);
			let specifiers = path.node.specifiers;
			let isJsxImport = false;
			if (specifiers.length > 0) {
				let importSpecifier = specifiers[0];
				if (importSpecifier.type === "ImportSpecifier") {
					isJsxImport = importSpecifier.imported.name === "jsx";
				}
			}
			if (isJsxImport) {
				path.node.source.value = '@dynatrace/react-native-plugin/lib/jsx-runtime';
				path.node.source.extra.rawValue = "\"" + path.node.source.value + "\"";
                path.node.source.extra.raw = "\"" + path.node.source.value + "\"";
				console.log("Mendix-Dynatrace-Babel-Plugin replaced JSX import of " + filename);
			}
		}
    }
  }
});
