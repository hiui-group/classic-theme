const path = require('path')
const rimraf = require('rimraf')
const cwd = process.cwd()
const libDir = path.join(cwd, 'lib')
const esDir = path.join(cwd, 'es')

rimraf.sync(libDir)
rimraf.sync(esDir)
