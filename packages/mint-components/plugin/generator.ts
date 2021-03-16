import { JsonDocs } from '@stencil/core/internal';
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
  const source = `const components=${metaSrc}
  ${templateSrc}
  `;

  let result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });

  let filehandle: FileHandle;
  try {
    filehandle = await fs.open('dist/grapesjs.js', 'w');
    await filehandle.write(result.outputText);
  } finally {
    if (filehandle !== undefined) await filehandle.close();
  }
}

function convertToGrapesJSMeta(docs: JsonDocs): GrapesJSModel[] {
  return docs.components.map(comp => {
    const uiSchema = comp.props.reduce((prev, prop) => {
      return {
        ...prev,
        [prop.attr ?? prop.name]: {
          'ui:widget': prop.docsTags.find(t => t.name === 'uiWidget')?.text,
          'ui:name': prop.docsTags.find(t => t.name === 'uiName')?.text,
        },
      };
    }, {});
    return {
      tag: comp.tag,
      name: comp.docsTags.find(t => t.name === 'uiName')?.text ?? comp.tag,
      uiSchema,
      traits: comp.props.map(p => {
        return {
          name: p.docsTags.find(t => t.name === 'uiName')?.text ?? p.attr ?? p.name,
          type: p.type,
          title: p.attr ?? p.name,
        };
      }),
    };
  });
}
