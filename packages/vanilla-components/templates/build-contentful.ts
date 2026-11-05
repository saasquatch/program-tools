// @ts-ignore
const fs = require("fs");
// @ts-ignore
const path = require("path");
// @ts-ignore
const htmlminify = require("html-minifier-terser")



const files = ["default-referred-widget-contentful", "default-referrer-widget-contentful"];
files.forEach(async filename => {
  // @ts-ignore
  const file = fs.readFileSync(path.resolve(__dirname, `../src/${filename}.html`), { encoding: "utf8" })

  const result = await htmlminify.minify(file, {
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
