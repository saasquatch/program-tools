import { JsonDocs, JsonDocsTag } from '@stencil/core/internal';
import * as ts from 'typescript';
import fsSync from 'fs';
import path from 'path';
import { FileHandle } from 'fs/promises';
import { GrapesJSModel } from './template';

const fs = fsSync.promises;

const TEMPLATE = path.resolve(__dirname, './template.ts');

export async function grapesJSGenerator(docsJson: JsonDocs) {
  const templateSrc = await fs.readFile(TEMPLATE, { encoding: 'utf-8' });
  const metaSrc = JSON.stringify(convertToGrapesJSMeta(docsJson));
  const source = `const components=${metaSrc};
  ${templateSrc}
  `;

  let result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.System } });

  // await writeFile('dist/grapesjs.js', result.outputText);
  await writeFile('docs/grapesjs.js', result.outputText);
  // await writeFile('www/grapesjs.js', result.outputText);
}

async function writeFile(file: string, content: string) {
  let filehandle: FileHandle;
  try {
    filehandle = await fs.open(file, 'w');
    await filehandle.write(content);
  } finally {
    if (filehandle !== undefined) await filehandle.close();
  }
}

function convertToGrapesJSMeta(docs: JsonDocs): GrapesJSModel[] {
  return docs.components.map(comp => {
    const order = tagValue(comp.docsTags, 'uiOrder');
    const uiSchema = comp.props.reduce(
      (prev, prop) => {
        return {
          ...prev,
          [prop.attr ?? prop.name]: {
            'ui:widget': tagValue(prop.docsTags, 'uiWidget'),
            'ui:name': uiName(prop),
            'ui:help': prop.docs,
          },
        };
      },
      {
        'ui:order': jsonTagValue(comp, 'uiOrder'),
      },
    );
    return {
      tag: comp.tag,
      name: uiName(comp) ?? comp.tag,
      uiSchema,
      traits: comp.props.map(p => {
        return {
          name: p.attr ?? p.name,
          type: uiType(p) ?? p.type,
          title: uiName(p) ?? p.attr ?? p.name,
          enum: jsonTagValue(p, 'uiEnum'),
          enumNames: jsonTagValue(p, 'uiEnumNames'),
        };
      }),
    };
  });
}

function tagValue(tags: JsonDocsTag[], name: string): string | undefined {
  return tags.find(t => t.name === name)?.text;
}
function jsonTagValue(tags: HasDocsTags, name: string) {
  const value = tagValue(tags.docsTags, name);
  return value && JSON.parse(value);
}

type HasDocsTags = { docsTags: JsonDocsTag[] };
const uiName = (x: HasDocsTags) => tagValue(x.docsTags, 'uiName');
const uiType = (x: HasDocsTags) => tagValue(x.docsTags, 'uiType');

const logTags = (x: HasDocsTags) => x.docsTags.map(t => t.name + '=' + t.text).join(',');
