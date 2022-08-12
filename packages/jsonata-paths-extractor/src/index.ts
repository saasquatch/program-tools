import * as jsonata from 'jsonata';
// import fs from 'node:fs';
// import path from 'node:path';
/**
 * TODO LIST:
 * - variables
 * $.foo.bar -> "/foo/bar"
 * $price.foo.bar -> ?
 *
 * - filters and sorts
 * Account[$$.Account.`Account Name` = "Firefly"].*[OrderID="order104"].Product.Price
 * Account[OrderID="order104"].*[OrderID="order104"].Product.Price
 *
 * - apply context to groups, filters, sorts
 */
interface PathContext {
  pathNode: jsonata.ExprNode;
  // extractedSteps: string[];
  variablesInScope: Record<string, PathContext>;
  // could be used to link paths together
  pathId: Symbol;
  parentPathId?: Symbol;
}
const RootContextId = Symbol('ROOT');

const UnknownContextId = Symbol('UNKNOWN');

const createUnknownContext = (
  ast: jsonata.ExprNode,
  variablesInScope: Record<string, PathContext>
) => {
  return {
    pathNode: ast,
    // extractedSteps: [],
    variablesInScope: { ...variablesInScope },
    pathId: UnknownContextId,
  };
};

const createRootContext = (ast: jsonata.ExprNode) => {
  return {
    pathNode: ast,
    // extractedSteps: [],
    variablesInScope: {},
    pathId: RootContextId,
  };
};

const reduceToPathString = (pathContext: PathContext): string => {
  return pathContext.pathNode.steps!.reduce(
    (pathString, step, index, array) => {
      // console.log('===STEP===');
      // console.log('type: ', step.type);
      // console.log('value: ', step.value);
      if (index === 0 && step.type === 'variable') {
        if (step.value === '$') {
          //reset context
          pathContext.parentPathId = RootContextId;
          return '';
        } else if (step.value === '') {
          return '';
        } else if (pathContext.variablesInScope[step.value]) {
          //look for variable in scope
          return (
            pathString +
            reduceToPathString(pathContext.variablesInScope[step.value])
          );
        } else {
          // end early for unknown variables
          array.splice(index + 1);
          return pathString;
        }
      } else if (step.type === 'name') {
        // console.log(pathString + '/' + step.value);
        return pathString + '/' + step.value;
      } else if (step.type === 'wildcard' || step.type === 'descendant') {
        array.splice(index + 1);
        return pathString || '/';
      } else {
        console.log(`===STEP WITH TYPE: ${step.type}===`);
        return pathString;
      }
    },
    ''
  );
};

const isParentRootContext = (ctx: PathContext) =>
  ctx.parentPathId === RootContextId;

// const isRootContext = (ctx: PathContext) => ctx.pathId === RootContextId;

const isParentUnknownContext = (ctx: PathContext) =>
  ctx.parentPathId === UnknownContextId;

const getPathsFromPathContexts = (pathContexts: PathContext[]) => {
  const paths: string[] = [];
  for (const pathContext of pathContexts) {
    if (
      isParentUnknownContext(pathContext) &&
      pathContext.pathNode?.steps?.[0]?.type !== 'variable' &&
      pathContext.pathNode?.steps?.[0]?.value !== '$'
    )
      // skip all unknown contexts unless there is a reset to root
      continue;
    const pathString = reduceToPathString(pathContext);
    if (isParentRootContext(pathContext)) {
      paths.push(pathString);
    } else {
      const parentPathContext = pathContexts.find(
        ctx => ctx.pathId === pathContext.parentPathId
      );
      if (parentPathContext) {
        // this can be optimized by storing parentPathString somewhere
        paths.push(reduceToPathString(parentPathContext) + pathString);
      }
    }
  }
  return paths;
};

function getPathContextsFromAST(
  ast: jsonata.ExprNode | jsonata.ExprNode[] | undefined,
  pathContexts?: PathContext[],
  currentContext?: PathContext
): PathContext[] {
  pathContexts = [...(pathContexts || [])];
  if (ast === undefined) return pathContexts;
  // todo: remove other loops and just call recursion on the array
  if (Array.isArray(ast)) {
    for (const ex of ast) {
      pathContexts = getPathContextsFromAST(ex, pathContexts, currentContext);
    }
    return pathContexts;
  }
  if (currentContext === undefined) {
    currentContext = createRootContext(ast);
  }
  // find paths
  switch (ast.type) {
    case 'path':
      //start path
      const newContext: PathContext = {
        pathNode: ast,
        // extractedSteps: [...currentContext.extractedSteps],
        variablesInScope: { ...currentContext.variablesInScope },
        pathId: Symbol(),
        parentPathId: currentContext.pathId,
      };
      pathContexts.push(newContext);
      pathContexts = getPathContextsFromAST(
        ast.steps,
        pathContexts,
        newContext
      );
      return getPathContextsFromAST(
        (ast as any)?.group?.lhs,
        pathContexts,
        newContext
      );
    case 'bind':
      console.log(ast.rhs!.type);
      if (
        ast.lhs &&
        ast.lhs.type === 'variable' &&
        ast.rhs &&
        ast.rhs.type === 'path'
      ) {
        // mutating currentContext might get messy
        currentContext.variablesInScope = {
          ...currentContext.variablesInScope,
          [ast.lhs.value]: {
            pathNode: ast.rhs,
            variablesInScope: currentContext.variablesInScope,
            pathId: Symbol(), //todo: should probably make variable Id
            parentPathId: currentContext.parentPathId,
          },
        };
      }
      return getPathContextsFromAST(
        ast.rhs!,
        getPathContextsFromAST(ast.lhs!, pathContexts, currentContext),
        currentContext
      );
    case 'apply':
    case 'binary':
      return getPathContextsFromAST(
        ast.rhs!,
        getPathContextsFromAST(ast.lhs!, pathContexts, currentContext),
        currentContext
      );
    case 'unary':
      if (ast.value === '[') {
        return getPathContextsFromAST(
          ast.expressions,
          pathContexts,
          currentContext
        );
      } else if (ast.value === '{') {
        return getPathContextsFromAST(
          ast.rhs!,
          getPathContextsFromAST(ast.lhs!, pathContexts, currentContext),
          currentContext
        );
      } else if (ast.value === '-') {
        return getPathContextsFromAST(
          (ast as any).expression!,
          pathContexts,
          currentContext
        );
      }
      break;
    case 'block':
      for (const expression of ast.expressions!) {
        pathContexts = getPathContextsFromAST(
          expression,
          pathContexts,
          currentContext
        );
      }
      return pathContexts;
    case 'lambda':
    case 'partial':
    case 'function':
      // very specific case
      if (ast.procedure && ast.procedure.value === 'lookup' && ast.arguments) {
        // join the args into one path
        // const joinedNode = ast.arguments.reduce((node, arg)=> {
        //   if (arg.type === 'path') return {}}
        // }, {})
      }
      const ex = ast.type === 'lambda' ? (ast as any).body! : ast.procedure!;
      return getPathContextsFromAST(
        ex,
        getPathContextsFromAST(ast.arguments, pathContexts, currentContext),
        currentContext
      );
    case 'condition':
      pathContexts = getPathContextsFromAST(
        (ast as any).condition,
        pathContexts,
        currentContext
      );
      pathContexts = getPathContextsFromAST(
        (ast as any).then,
        pathContexts,
        currentContext
      );
      pathContexts = getPathContextsFromAST(
        (ast as any).else,
        pathContexts,
        currentContext
      );
      return pathContexts;
    case 'transform':
      pathContexts = getPathContextsFromAST(
        (ast as any).condition,
        pathContexts,
        currentContext
      );
      pathContexts = getPathContextsFromAST(
        (ast as any).then,
        pathContexts,
        currentContext
      );
      pathContexts = getPathContextsFromAST(
        (ast as any).else,
        pathContexts,
        currentContext
      );
      return pathContexts;
    case 'parent':
    case 'descendant':
    case 'wildcard':
      return getPathContextsFromAST(
        ast.stages,
        pathContexts,
        createUnknownContext(
          currentContext.pathNode,
          currentContext.variablesInScope
        )
      );
    case 'regex':
    case 'variable':
    case 'value':
    case 'string':
    case 'number':
      break;
    case 'filter':
      return getPathContextsFromAST(
        (ast as any).expr,
        pathContexts,
        currentContext
      );
    // case 'sort': // todo
    case 'name':
      return getPathContextsFromAST(ast.stages, pathContexts, currentContext);
  }
  return pathContexts;
}

export default function(ast: jsonata.ExprNode): string[] {
  // console.log('======');
  // console.log(JSON.stringify(ast, null, 2));
  // console.log('------');
  // console.log(
  //   JSON.stringify(
  //     getPathsFromPathContexts(getPathContextsFromAST(ast)),
  //     null,
  //     0
  //   )
  // );
  // console.log('======');
  return getPathsFromPathContexts(getPathContextsFromAST(ast));
}

//todo: remove and make actual tests
// const testExpressions = [
//   `event.fields.amount > 0`,
//   `user.customFields.x = "yes"`,
//   `user.referredByReferral.referredUser.customFields.y = false`,
//   'Account.Order.Product.($var1 := Price ; $var2:=Quantity; $var1 * $var2)',
//   'Account.Order.Product.($var1 := $someVar1; $var2 := $someVar2; $var1 * $var2)',
//   '*',
//   'test.%',
//   '*.test',
//   'Account[$$.Account.`Account Name` = "Firefly"].*[OrderID="order104"].Product.Price',
//   'Account[`Account Name`="order104"].*[$$.Account.Order.OrderID="order104" ].Product.Price',
//   `(
//       $field := "x";
//       $fieldValue = $lookup(event.fields, $field);
//       $fieldValue > 0
//    )`,
//   `(event.key = \"purchase\" ? (user.accountId = \"new\" and user.accountId = \"unique\" ?  $tier1))`,
//   `Account.Order.Product {
//     \`Product Name\`: {"Price": Price, "Qty": Quantity}
//   }`,
//   '$test.foo.bar',
//   '($test := Something; $test.foo.bar)',
//   '$.foo.bar',
// ];
// const groupsDir = fs.readdirSync(
//   path.join(__dirname, '../../jsonata/test/test-suite/groups')
// );

// groupsDir.forEach(groupDir => {
//   const files = fs.readdirSync(
//     path.join(__dirname, '../../jsonata/test/test-suite/groups/', groupDir)
//   );
//   files.forEach(file => {
//     try {
//       const contents = JSON.parse(
//         fs
//           .readFileSync(
//             path.join(
//               __dirname,
//               '../../jsonata/test/test-suite/groups/',
//               groupDir,
//               file
//             )
//           )
//           .toString()
//       );
//       if (Array.isArray(contents)) {
//         for (const d of contents) {
//           if (typeof d.expr === 'string') {
//             // testExpressions.push(d.expr);
//           }
//         }
//         return;
//       }
//       if (typeof contents.expr === 'string') {
//         // testExpressions.push(contents.expr);
//       }
//     } catch (e) {
//       //ignore parsing errors
//       errorCount++;
//     }
//   });
// });
// var errorCount = 0;
// for (const expr of testExpressions) {
//   try {
//     const ast = jsonata(expr).ast();
//     const result = JSON.stringify(
//       getPathsFromPathContexts(getPathContextsFromAST(ast)),
//       null,
//       4
//     );
//     console.log('===EXPRESION===');
//     console.log(expr);
//     console.log('===PARSED PATHS===');
//     console.log(result);
//     console.log('=================');
//   } catch (e) {
//     if (!e.code) throw e;
//     // ignore invalid jsonata expressions
//     errorCount++;
//   }
// }
// console.log('TOTAL EXPRESSIONS PARSED: ', testExpressions.length - errorCount);
