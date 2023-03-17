# Mendix Dynatrace Real-time User Monitoring (RUM)
This module can help configure real-time user monitoring for Dynatrace which allows Dynatrace visibility on the behavior of the client (end-user). It can capture the user journey (e.g. clicks on buttons) and the actions that come out of it (like network calls). If integrated through the application landscape, it provides end-to-end visibility (from the moment the end-user has pressed the button to queries executed in the 4th microservice called deeper in your landscape).

It can provide a very efficient means to trace user frustration or issues.

## !! **Warning** !!
The integration requires changes to the Mendix Platform to work. It is unsupported by Mendix. It might not work in future versions and you are on your own if things don't work as they are expected to.

## Changes to the Mendix Platform

### Dynatrace changes to the Metro configuration
Dynatrace requires a Babel transformer (and reporter) to instrument (platform) Javascript. This follows their React Native integration approach.
To make this possible one must:
- Use `metro.config.js` instead of `metro.config.json`. A `metro.config.js.template` is placed in the `mxbuild` directory of this module which must replace the `metro.config.json.template` file in your `<Mendix install>/modeler/runtemplates` directory. It checks if there is a `mxbuild` folder in your project's directory and includes the `metro.config.extension.js` file, which can be used to extend the Metro configuration.
- The Mendix Platform's way of building, aims for a `metro.config.json` instead of `metro.config.js`. A script is made to replace the original `node` executable and change this parameter (`mxbuild/node.py`).
- When including the Dynatrace transformer, it requires a lot of depdencies (which are located in `<Mendix install>/modeler/tools/node/node_modules`). To avoid having to include all libraries from the Mendix Platform into the Dynatrace module directory, the environment variable `NODE_PATH` (referring to the Platform's `node_modules`). This is also part of the `node` executable replacement script.

### Dynatrace changes to Babel
When using JSX, Dynatrace requires `@babel/plugin-transform-react-jsx` to redirect the JSX runtime to its own proxy/implementation (see https://www.npmjs.com/package/@dynatrace/react-native-plugin#react-automatic-runtime).
To make this possible one must:
- Create a custom `.babelrc.template` which should replace the file in `<Mendix install>/modeler/runtemplates`. It is included in the `mxbuild` directory of this module. 

### Import JSX from Dynatrace for Mendix Platform Javascripts
Platform widgets, located in `node_modules/mendix` are already transformed from JSX to JS and therefore not subject to the Babel transformer of Dynatrace. As a result, presses on Mendix Platform Core Widgets, are not captured in the user journey.
One can still capture these elements by chaning the import of `jsx` from `react-native` to `@dynatrace/react-native-plugin/lib/jsx-runtime`.
It is performed by the babel plugin `mendix-dynatrace-babel-plugin` located in the directory of the Javascript Actions.
To make this possible one must:
- Include the plugin in the `.babelrc` (see the custom `.babelrc.template` located in the `mxbuild` directory of this module).

### CICD customizations
The above points address the need for a custom procedure to build the bundle of your native app. It is not possible to build a bundle in the Mendix Cloud, so it cannot be leveraged in combination with OTA.
The following steps must be changed on CICD to enable the Dynatrace integration:
- Replace the `*.template` files in the `<Mendix install>/modeler/runtemplates` by those in the `mxbuild` directory of this module. Note that during this copy action the `.babelrc` needs special attention as it is a dotfile.
- Replace the `node` executable of the Mendix installation by a proxy script (`mxbuild/node.py`).

## Compatibility by this module
The following types of integrations are supported by this module:
 - Native Mobile client integration (React Native)
 - Tested in Mendix 9.16 and 9.22

## Setup

### Dynatrace Real User Monitoring

#### Project Setup
Within the project copy the `build/metro.config.extension.js`.

#### Native template
It is required to include npm package `@dynatrace/react-native-plugin` of version 2.259.3.

``npm install @dynatrace/react-native-plugin@2.259.3`` 

## Build using CI/CD
On CI/CD, the following steps need to be performed before MxBuild is invoked.
The `modeler` path should be the extracted contents of the `mxbuild.tar.gz`
 - Rename `modeler/tools/node/node` to `modeler/tools/node/node-org` within the extracted structure of the `mxbuild.tar.gz`.
 - Copy `mxbuild/node` to `modeler/tools/node/node`
 - Execute `chmod 755 modeler/tools/node/node`
 - Copy and overwrite all `mxbuild/*.template` files to `modeler/runtemplates/deployment/native`
 - Remove the file `modeler/runtemplates/deployment/native/metro.config.json.template`
 - Before executing `mxbuild`, set the environment variable `NODE_PATH` to `modeler/tool/node/node_modules`

## Run in Studio Pro
The installation directory of Studio Pro is referred to `<install-dir>`
Perform these steps once.
- Copy all `mxbuild/*.template` files to `<install-dir>/modeler/runtemplates/deployment/native`

For each time you start the app:
- Make sure the developer app is not running / connected to your Studio Pro.
- Start the app in Studio Pro.
- In Windows Task Manager, search for the process `Node JS Server` instantiated by Studio Pro and kill it (as soon as possible).
- Open a command line and go to the directory `<project dir>/deployment/native`.
- Start `run.bat`
