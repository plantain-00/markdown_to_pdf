import minimist from 'minimist'
import puppeteer from 'puppeteer'
import MarkdownIt from 'markdown-it'
import * as hljs from 'highlight.js'
import * as fs from 'fs'
import pangu from 'pangu'
import * as markdownlint from 'markdownlint'
import * as packageJson from '../package.json'

let suppressError = false

function showToolVersion() {
  console.log(`Version: ${packageJson.version}`)
}

async function executeCommandLine() {
  const argv = minimist(process.argv.slice(2), { '--': true })

  const showVersion = argv.v || argv.version
  if (showVersion) {
    showToolVersion()
    return
  }

  suppressError = argv.suppressError

  const files = argv._
  if (files.length !== 1) {
    throw new Error('Need 1 file.')
  }
  const file = files[0]

  const pdfPath: string = argv.o
  if (!pdfPath) {
    throw new Error('Need a pdf path(-o path).')
  }

  const htmlPath: string = argv.html

  const cssPath: string = argv.css
  const cssContent = cssPath ? fs.readFileSync(cssPath).toString() : ''

  const md = MarkdownIt({
    highlight: (str: string, lang: string) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre><code class="hljs ${lang}">${hljs.highlight(lang, str).value}</code></pre>`
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          return `<pre><code class="hljs">${hljs.highlightAuto(str).value}</code></pre>`
        } catch (error) {
          console.log(error)
        }
      }
      return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`
    }
  })

  let fileContent = fs.readFileSync(file).toString()

  const spacing: boolean = argv.spacing
  if (spacing) {
    const newFileContent = pangu.spacing(fileContent)
    if (newFileContent !== fileContent) {
      fs.writeFileSync(file, newFileContent)
      fileContent = newFileContent
    }
  }

  const lint: boolean = argv.lint
  if (lint) {
    const lintResult = markdownlint.sync({
      files: [file],
      config: {
        'default': true,
        'line-length': false
      }
    }).toString()
    if (lintResult) {
      console.log(lintResult)
      throw new Error('Lint error.')
    }
  }

  const htmlContent = md.render(fileContent)
  const styledHtmlContent = `<!DOCTYPE html>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="renderer" content="webkit" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
${cssContent}
</style>
<body>
${htmlContent}
</body>
`

  if (htmlPath) {
    fs.writeFileSync(htmlPath, styledHtmlContent)
  }

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(styledHtmlContent)
  await page.pdf({ path: pdfPath })

  await browser.close()
}

executeCommandLine().then(() => {
  console.log('markdown_to_pdf success.')
}, error => {
  if (error instanceof Error) {
    console.log(error.message)
  } else {
    console.log(error)
  }
  if (!suppressError) {
    process.exit(1)
  }
})
