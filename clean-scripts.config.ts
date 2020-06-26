import { checkGitStatus } from 'clean-scripts'

const tsFiles = `"src/**/*.ts"`

export default {
  build: [
    'rimraf dist/',
    'tsc -p src/',
    `node dist/index.js demo/test.md --css demo/style.css -o demo/test.pdf --spacing --html demo/test.html --lint`
  ],
  lint: {
    ts: `eslint --ext .js,.ts,.tsx ${tsFiles}`,
    export: `no-unused-export ${tsFiles}`,
    markdown: `markdownlint README.md`,
    typeCoverage: 'type-coverage -p src --strict'
  },
  test: [
    'clean-release --config clean-run.config.ts',
    () => checkGitStatus()
  ],
  fix: `eslint --ext .js,.ts,.tsx ${tsFiles} --fix`
}
