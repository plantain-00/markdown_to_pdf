module.exports = {
  include: [
    'bin/*',
    'dist/*.js',
    'package.json',
    'yarn.lock'
  ],
  exclude: [
  ],
  postScript: [
    'cd "[dir]" && yarn --production',
    'node [dir]/dist/index.js demo/test.md --css demo/style.css -o demo/test.pdf --spacing --html demo/test.html --lint'
  ]
}
