module.exports = {
    react: {
        /**
         * If the plugin should start automatically or not. Refer to the documentation for more details.
         */
        autoStart: true,

        /**
         * Debug Logs
         */
        debug: true,

        lifecycle: {
            /**
             * Decide if you want to see Update Cycles as well
             */
            includeUpdate: false,

            /**
             * Filter for Instrumenting Lifecycle of Components / True = Will be instrumented
             */
            instrument: (filename) => {
				return false;
            }
        },

        input: {
            /**
             * Allows you to filter the instrumentation for touch events, refresh events and picker events in certain files
             * True = Will be instrumented
             */
            instrument: (filename) => {
                try {
					const path = require('path');
					if(filename.endsWith(path.sep + "G.tsx") || filename.endsWith(path.sep + "GestureHandlerRootView.android.tsx") ||
						filename.endsWith(path.sep + "gestureHandlerRootHOC.tsx") || filename.endsWith(path.sep + "createAnimatedComponent.js") ||
						filename.endsWith(path.sep + "Animated.js")) {
							console.log("Skipping file " + filename);
							return false;
					}
					
					return true;
				} catch (err) {
					console.log(err);
					return false;
				}
            }
        }
    },
    android: {
        // Those configs are copied 1:1
        config: `
        dynatrace {
            configurations {
                defaultConfig {
                    autoStart {
                        applicationId 'Insert your ApplicationID from Config'
                        beaconUrl 'Insert your BeaconURL from Config'
                    }
                }
            }
        }
        `
    },
    ios: {
        // Those configs are copied 1:1
        config: `
        <key>DTXApplicationID</key>
        <string>\${APPLICATION_ID}</string>
        <key>DTXBeaconURL</key>
        <string>Insert your ClusterURL from Config</string>
        `
    }
}
