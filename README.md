# Mendix Dynatrace Integration v 0.2

## Supported
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
