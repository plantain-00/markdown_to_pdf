const childProcess = require('child_process')

module.exports = {
  build: [
    'rimraf dist/',
    'tsc -p src/'
  ],
  lint: {
    ts: `tslint "src/**/*.ts"`,
    js: `standard "**/*.config.js"`,
    export: `no-unused-export "src/**/*.ts" "spec/*.ts"`
  },
  test: [
    'tsc -p spec',
    'jasmine',
    `node dist/index.js demo/test.md --css demo/style.css -o demo/test.pdf --spacing --html demo/test.html`,
    () => new Promise((resolve, reject) => {
      childProcess.exec('git status -s', (error, stdout, stderr) => {
        if (error) {
          reject(error)
        } else {
          if (stdout) {
            reject(new Error('generated files does not match.'))
          } else {
            resolve()
          }
        }
      }).stdout.pipe(process.stdout)
    })
  ],
  fix: {
    ts: `tslint --fix "src/**/*.ts"`,
    js: `standard --fix "**/*.config.js"`
  },
  release: `clean-release`
}
