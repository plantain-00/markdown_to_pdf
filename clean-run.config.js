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
    '[dir]/bin/markdown_to_pdf demo/test.md --css demo/style.css -o demo/test.pdf --spacing --html demo/test.html --lint'
  ]
}
