import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { Package, CustomElement, Attribute } from '@raisins/schema';

/**
 * Extracts JSDoc comment from a node
 */
function getJsDocComment(node: ts.Node, sourceFile: ts.SourceFile): string {
  const fullText = sourceFile.getFullText();
  const nodeStart = node.getFullStart();
  const commentRanges = ts.getLeadingCommentRanges(fullText, nodeStart);
  
  if (!commentRanges || commentRanges.length === 0) return '';
  
  // Get the last comment range (closest to the node)
  const lastComment = commentRanges[commentRanges.length - 1];
  const commentText = fullText.substring(lastComment.pos, lastComment.end);
  
  // Parse JSDoc comment
  if (commentText.startsWith('/**')) {
    const lines = commentText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line !== '/**' && line !== '*/' && !line.startsWith('* @'))
      .map(line => line.replace(/^\* ?/, ''))
      .join(' ')
      .trim();
    return lines;
  }
  
  return '';
}

/**
 * Extracts JSDoc tags from a node
 */
function getJsDocTags(node: ts.Node, sourceFile: ts.SourceFile): Map<string, string> {
  const tags = new Map<string, string>();
  const fullText = sourceFile.getFullText();
  const nodeStart = node.getFullStart();
  const commentRanges = ts.getLeadingCommentRanges(fullText, nodeStart);
  
  if (!commentRanges || commentRanges.length === 0) return tags;
  
  // Get the last comment range (closest to the node)
  const lastComment = commentRanges[commentRanges.length - 1];
  const commentText = fullText.substring(lastComment.pos, lastComment.end);
  
  // Parse JSDoc tags
  if (commentText.startsWith('/**')) {
    const lines = commentText.split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*\*\s*@(\w+)\s+(.*)$/);
      if (match) {
        const [, tagName, tagValue] = match;
        tags.set(tagName, tagValue.trim());
      }
    }
  }
  
  return tags;
}

/**
 * Converts kebab-case to camelCase
 */
function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Extracts type information from a TypeScript type
 */
function extractTypeInfo(type: ts.Type, checker: ts.TypeChecker): { type: string; enum?: any[] } {
  const typeString = checker.typeToString(type);
  
  // Check for union types (string literals)
  if (type.isUnion()) {
    const literalValues = type.types
      .map(t => {
        if (t.isStringLiteral()) {
          return t.value;
        }
        if (t.isNumberLiteral()) {
          return t.value;
        }
        return null;
      })
      .filter(v => v !== null);
    
    if (literalValues.length > 0) {
      return {
        type: typeof literalValues[0] === 'number' ? 'number' : 'string',
        enum: literalValues
      };
    }
  }

  // Map TypeScript types to raisins types
  if (typeString.includes('string')) return { type: 'string' };
  if (typeString.includes('number')) return { type: 'number' };
  if (typeString.includes('boolean')) return { type: 'boolean' };
  
  return { type: typeString };
}

/**
 * Extracts attributes from a component's props interface
 */
function extractAttributes(
  propsInterface: ts.InterfaceDeclaration,
  observedAttributes: string[],
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): Attribute[] {
  const attributes: Attribute[] = [];

  propsInterface.members.forEach(member => {
    if (ts.isPropertySignature(member) && member.name) {
      const propName = member.name.getText();
      const kebabName = propName.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      
      // Only include if it's in observedAttributes
      if (!observedAttributes.includes(kebabName)) {
        return;
      }

      const description = getJsDocComment(member, sourceFile);
      const tags = getJsDocTags(member, sourceFile);
      
      let type = 'string';
      let enumValues: any[] | undefined;
      
      if (member.type) {
        const typeNode = checker.getTypeAtLocation(member.type);
        const typeInfo = extractTypeInfo(typeNode, checker);
        type = typeInfo.type;
        enumValues = typeInfo.enum;
      }

      const attribute: Attribute = {
        name: kebabName,
        title: tags.get('uiName') || tags.get('title') || propName,
        description: description,
        type: type,
        required: !member.questionToken,
      };

      if (enumValues) {
        attribute.enum = enumValues;
      }

      if (tags.has('default')) {
        attribute.default = tags.get('default');
      }

      if (tags.has('uiWidget')) {
        attribute.uiWidget = tags.get('uiWidget');
      }

      if (tags.has('uiGroup')) {
        attribute.uiGroup = tags.get('uiGroup');
      }

      if (tags.has('uiOrder')) {
        const order = parseInt(tags.get('uiOrder') || '0', 10);
        if (!isNaN(order)) {
          attribute.uiOrder = order;
        }
      }

      if (tags.has('uiEnum')) {
        try {
          const enumStr = tags.get('uiEnum') || '[]';
          attribute.enum = JSON.parse(enumStr);
        } catch (e) {
          // Ignore parse errors
        }
      }

      if (tags.has('uiEnumNames')) {
        try {
          const enumNamesStr = tags.get('uiEnumNames') || '[]';
          attribute.enumNames = JSON.parse(enumNamesStr);
        } catch (e) {
          // Ignore parse errors
        }
      }

      if (tags.has('minimum')) {
        const min = parseFloat(tags.get('minimum') || '0');
        if (!isNaN(min)) {
          attribute.minimum = min;
        }
      }

      if (tags.has('maximum')) {
        const max = parseFloat(tags.get('maximum') || '0');
        if (!isNaN(max)) {
          attribute.maximum = max;
        }
      }

      attributes.push(attribute);
    }
  });

  return attributes;
}

/**
 * Extracts component information from a TypeScript source file
 */
function extractComponentInfo(sourceFile: ts.SourceFile, checker: ts.TypeChecker): CustomElement | null {
  let componentInfo: CustomElement | null = null;
  let propsInterface: ts.InterfaceDeclaration | null = null;
  let observedAttributes: string[] = [];
  let tagName = '';
  let componentExport: ts.Node | null = null;

  function visit(node: ts.Node) {
    // Find the props interface
    if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith('Props')) {
      propsInterface = node;
    }

    // Find the useComponent call
    if (ts.isVariableStatement(node)) {
      const declaration = node.declarationList.declarations[0];
      if (declaration && ts.isVariableDeclaration(declaration)) {
        const init = declaration.initializer;
        if (init && ts.isCallExpression(init)) {
          const expression = init.expression;
          if (ts.isIdentifier(expression) && expression.text === 'useComponent') {
            componentExport = node;
            
            // Extract tag name (second argument)
            if (init.arguments.length > 1 && ts.isStringLiteral(init.arguments[1])) {
              tagName = init.arguments[1].text;
            }

            // Extract observed attributes (third argument)
            if (init.arguments.length > 2) {
              const thirdArg = init.arguments[2];
              let arrayExpr: ts.ArrayLiteralExpression | undefined;
              
              // Handle direct array literal or array with "as const"
              if (ts.isArrayLiteralExpression(thirdArg)) {
                arrayExpr = thirdArg;
              } else if (ts.isAsExpression(thirdArg) && ts.isArrayLiteralExpression(thirdArg.expression)) {
                arrayExpr = thirdArg.expression;
              }
              
              if (arrayExpr) {
                observedAttributes = arrayExpr.elements
                  .filter(ts.isStringLiteral)
                  .map(el => el.text);
              }
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (propsInterface && tagName && componentExport) {
    const description = getJsDocComment(componentExport, sourceFile);
    const tags = getJsDocTags(componentExport, sourceFile);
    const attributes = extractAttributes(propsInterface, observedAttributes, sourceFile, checker);

    componentInfo = {
      tagName: tagName,
      title: tags.get('uiName') || tags.get('title') || tagName,
      description: description,
      attributes: attributes,
    };

    // Add additional metadata from JSDoc tags
    if (tags.has('validParents')) {
      try {
        const parentsStr = tags.get('validParents') || '[]';
        componentInfo.validParents = JSON.parse(parentsStr);
      } catch (e) {
        // Ignore parse errors
      }
    }

    if (tags.has('slotEditor')) {
      componentInfo.slotEditor = tags.get('slotEditor');
    }

    if (tags.has('exampleGroup')) {
      componentInfo.exampleGroup = tags.get('exampleGroup');
    }

    if (tags.has('example')) {
      const exampleText = tags.get('example');
      if (exampleText) {
        const parts = exampleText.split(' - ');
        componentInfo.examples = [{
          title: parts[0]?.trim() || 'Example',
          content: parts[1]?.trim() || exampleText,
          tagName: tagName
        }];
      }
    }
  }

  return componentInfo;
}

/**
 * Generates raisins.json from TypeScript component files
 */
function generateRaisins(srcDir: string, outFile: string) {
  const configPath = ts.findConfigFile(srcDir, ts.sys.fileExists, 'tsconfig.json');
  if (!configPath) {
    throw new Error('Could not find tsconfig.json');
  }

  const { config } = ts.readConfigFile(configPath, ts.sys.readFile);
  const { options, fileNames } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    path.dirname(configPath)
  );

  const program = ts.createProgram(fileNames, options);
  const checker = program.getTypeChecker();

  const components: CustomElement[] = [];

  // Find all component files (excluding stories, tests, etc.)
  const componentFiles = program.getSourceFiles()
    .filter(sf => 
      !sf.isDeclarationFile &&
      sf.fileName.includes('/components/') &&
      !sf.fileName.includes('.stories.') &&
      !sf.fileName.includes('.test.') &&
      !sf.fileName.includes('View.ts') &&
      sf.fileName.endsWith('.ts')
    );

  componentFiles.forEach(sourceFile => {
    const componentInfo = extractComponentInfo(sourceFile, checker);
    if (componentInfo) {
      components.push(componentInfo);
    }
  });

  const raisinsDoc: Package = {
    schemaVersion: '1.0.0',
    modules: [
      {
        tags: components,
      },
    ],
  };

  // Ensure output directory exists
  const outDir = path.dirname(outFile);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outFile, JSON.stringify(raisinsDoc, null, 2));
  console.log(`✅ Generated raisins.json with ${components.length} components`);
}

// Run the generator
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = path.resolve(__dirname, '../src');
const outFile = path.resolve(__dirname, '../dist/docs/raisins.json');

try {
  generateRaisins(srcDir, outFile);
} catch (error) {
  console.error('❌ Error generating raisins.json:', error);
  process.exit(1);
}
