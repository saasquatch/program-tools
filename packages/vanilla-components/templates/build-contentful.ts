// @ts-ignore
const fs = require("fs");
// @ts-ignore
const path = require("path");
// @ts-ignore
const htmlminify = require("html-minifier")



const done = ["default-referred-widget-contentful", "default-referrer-widget-contentful", "partner-referrer-widget-contentful"].forEach(filename => {
  // @ts-ignore
  const file = fs.readFileSync(path.resolve(__dirname, `../src/${filename}.html`), { encoding: "utf8" })

  const result = htmlminify.minify(file, {
    // TODO: there are still a few line breaks in output
    collapseWhitespace: true,
    removeComments: true
  });

  console.log(`

  ====== src/${filename}.html
  ====== Paste this into contentful
  
  ${JSON.stringify(result)}
  
  =====
  
  `)
})
