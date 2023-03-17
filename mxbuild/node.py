#!/usr/bin/python3

import sys
import os.path
import subprocess

newargs = sys.argv.copy()
try:
    configIndex = newargs.index("--config")
    configFile = newargs[configIndex+1]

    if not os.path.exists(configFile):
        print(configFile + " not found, replacing metro.config.json with metro.config.js")
        newargs[configIndex+1] = configFile.replace("metro.config.json", "metro.config.js")
except Exception as e:
    print("Could not replace config: " + e)

newargs[0] = newargs[0] + "-org"

subprocess.run(newargs)
