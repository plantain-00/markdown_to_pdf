# markdown_to_pdf

[![Dependency Status](https://david-dm.org/plantain-00/markdown_to_pdf.svg)](https://david-dm.org/plantain-00/markdown_to_pdf)
[![devDependency Status](https://david-dm.org/plantain-00/markdown_to_pdf/dev-status.svg)](https://david-dm.org/plantain-00/markdown_to_pdf#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/markdown_to_pdf.svg?branch=master)](https://travis-ci.org/plantain-00/markdown_to_pdf)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/markdown_to_pdf?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/markdown_to_pdf/branch/master)
[![npm version](https://badge.fury.io/js/markdown_to_pdf.svg)](https://badge.fury.io/js/markdown_to_pdf)
[![Downloads](https://img.shields.io/npm/dm/markdown_to_pdf.svg)](https://www.npmjs.com/package/markdown_to_pdf)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fmarkdown_to_pdf%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/markdown_to_pdf)

A CLI tool to convert a markdown to a pdf file.

## install

`yarn global add markdown_to_pdf`

## usage

run `markdown_to_pdf test.md --css style.css -o test.pdf`

## options

+ `--html test.html` to generate a html for css debug usage
+ `--spacing` to add space between letter and Chinese character
+ `--lint` to lint markdown file
