const childProcess = require('child_process')
const util = require('util')

const execAsync = util.promisify(childProcess.exec)
module.exports = {
  build: [
    'rimraf dist/',
    'tsc -p src/',
    `node dist/index.js demo/test.md --css demo/style.css -o demo/test.pdf --spacing --html demo/test.html`
  ],
  lint: {
    ts: `tslint "src/**/*.ts"`,
    js: `standard "**/*.config.js"`,
    export: `no-unused-export "src/**/*.ts" "spec/*.ts"`
  },
  test: [
    'tsc -p spec',
    'jasmine',
    async () => {
      const { stdout } = await execAsync('git status -s')
      if (stdout) {
        console.log(stdout)
        throw new Error(`generated files doesn't match.`)
      }
    }
  ],
  fix: {
    ts: `tslint --fix "src/**/*.ts"`,
    js: `standard --fix "**/*.config.js"`
  },
  release: `clean-release`
}
