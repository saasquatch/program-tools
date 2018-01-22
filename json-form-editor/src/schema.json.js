// https://github.com/jdorn/json-editor/blob/master/examples/advanced.html
// TODO: Make this configurable on Data Type level.
/*eslint quotes: [2, "double"]*/
window.CONTENTFUL_FORM_EDITOR_SCHEMA = { 
    "title": "Email Template",
    "oneOf": [ 
        { "$ref": "https://unpkg.com/@saasquatch/schema@alpha/json/SimpleEmail.schema.json" },
        { "$ref": "https://unpkg.com/@saasquatch/schema@alpha/json/HtmlEmail.schema.json" } 
    ]
}
;
