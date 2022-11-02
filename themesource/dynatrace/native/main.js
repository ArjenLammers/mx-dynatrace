// import * as variables from "../../../theme/native/custom-variables";

import { Dynatrace } from '../../../javascriptsource/dynatrace/actions/node_modules/@dynatrace/react-native-plugin';
import { NativeModules } from 'react-native';
import { hooks } from 'mendix/native';
import { Button } from 'mendix/Button';
import { Container } from "mendix/Container";
import { Image } from "mendix/Image";

let DT = NativeModules.DynatraceBridge;
if (!DT) {
    console.warn("[Dynatrace] Dynatrace native module not found.");
} else {
    hooks.onSessionWillStart(async () => {
        Dynatrace.withMonitoring(Button, "Button");
        Dynatrace.withMonitoring(Container, "Container");
        Dynatrace.withMonitoring(Container, "Image");

        console.info("[Dynatrace] Instrumented elements.");
    });
}
