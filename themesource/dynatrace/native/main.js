// import * as variables from "../../../theme/native/custom-variables";

import { Dynatrace } from '../../../javascriptsource/dynatrace/actions/node_modules/@dynatrace/react-native-plugin';
import { NativeModules } from 'react-native';
import { addLogListener } from 'mendix/logging';
import { hooks } from 'mendix/native';

let DT = NativeModules.DynatraceBridge;
if (!DT) {
    console.warn("[Dynatrace] Dynatrace native module not found.");
} else {
    hooks.onSessionWillStart(async () => {
        addLogListener(
            (level, logNode, ...args) => {
                try {
                    if (level === 'error') {
                        const message = args.map(arg => arg instanceof Error ? arg.message : String(arg)).join(", ");
                        Dynatrace.reportErrorStacktrace(logNode, args[0], null, message);
                    }
                    args.forEach((arg) => {
                        if (arg instanceof Error) {
                            let err = arg;
                            Dynatrace.reportErrorStacktrace(err.name, err.message, null, err.stack);
                        }
                    });

                } catch (err) {
                    // should never be here.
                    debugger;
                }
                
            }
        );
        console.info("[Dynatrace] Listening on errors.");
    });
}
