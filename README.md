# Mendix Dynatrace Integration v 0.2

## Supported
The following types of integrations are supported by this module:
 - Native Mobile client integration (React Native)

## Setup

### Dynatrace Real User Monitoring

#### Project Setup
Within the project copy the `build/metro.config.extension.js`.

#### Native template


#### MxBuild
On CI/CD, the following steps need to be performed before MxBuild is invoked:
 - Rename `modeler/tools/node/node` to `modeler/tools/node/node-org` within the extracted structure of the `mxbuild.tar.gz`.
 - Copy `mxbuild/node` to `modeler/tools/node/node` within the extracted structure of the `mxbuild.tar.gz`.
 - Execute `chmod 755 modeler/tools/node/node`
 - Remove `modeler/runtemplates/deployments/native/metro.config.json.template`.
 - Copy `mxbuild/metro.config.js.template` into `modeler/runtemplates/deployments/native`.
