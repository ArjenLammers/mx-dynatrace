console.info("included metro.extension.config.js");

exports.getMetroExtension = function(projectDir, installDir) {

    return {
        "resolver": {
            "extraNodeModules": {
                "@dynatrace/react-native-plugin": projectDir + "/javascriptsource/dynatrace/actions/node_modules/@dynatrace/react-native-plugin"
            },
        },
        "transformer": {
            "babelTransformerPath": require.resolve(
				projectDir + "/javascriptsource/dynatrace/actions/node_modules/@dynatrace/react-native-plugin/lib/dynatrace-transformer")
        },
        "reporter": require(projectDir + "/javascriptsource/dynatrace/actions/node_modules/@dynatrace/react-native-plugin/lib/dynatrace-reporter")
    }
}
