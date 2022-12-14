// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import "mx-global";
import { Big } from "big.js";

// BEGIN EXTRA CODE

import { Dynatrace } from '../../../javascriptsource/dynatrace/actions/node_modules/@dynatrace/react-native-plugin';
import { Button } from 'mendix/Button';
import { Container } from "mendix/Container";
import { Image } from "mendix/Image";
import { NativeModules } from 'react-native';

// END EXTRA CODE

/**
 * This action does not appear to be working, but is left here to pick up later if required.
 * @returns {Promise.<void>}
 */
export async function Instrument() {
	// BEGIN USER CODE
    let DT = NativeModules.DynatraceBridge;
    if (!DT) {
        console.warn("[Dynatrace] Dynatrace native module not found.");
        return;
    }

	Dynatrace.withMonitoring(Button, "Button");
    Dynatrace.withMonitoring(Container, "Container");
    Dynatrace.withMonitoring(Container, "Image");

    console.info("[Dynatrace] Instrumented elements.");
	// END USER CODE
}
