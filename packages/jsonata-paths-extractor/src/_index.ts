// import jsonata from 'jsonata';
// import fs from 'node:fs';
// import path from 'node:path';
// /**
//  * TODO LIST:
//  * - variables
//  * $.foo.bar -> "/foo/bar"
//  * $price.foo.bar -> ?
//  *
//  * - filters and sorts
//  * Account[$$.Account.`Account Name` = "Firefly"].*[OrderID="order104"].Product.Price
//  * Account[OrderID="order104"].*[OrderID="order104"].Product.Price
//  *
//  * - apply context to groups, filters, sorts
//  *
//  * @param expr JSONata AST
//  * @param accumulatedPaths used internally
//  * @param currentPath used internally
//  * @returns
//  */

// // interface string {
// //   path: string;
// //   exactPath: boolean;
// // }

// // could go path -> something -> path or path -> name[]
// const getPaths = (
//   expr: jsonata.ExprNode | jsonata.ExprNode[],
//   accumulatedPaths: string[] = [],
//   currentPath?: string
// ): string[] => {
//   let paths: string[] = [...accumulatedPaths];
//   if (!expr) {
//     // easier than checking if parts exist
//     return paths;
//   }

//   if (Array.isArray(expr)) {
//     for (const ex of expr) {
//       paths = getPaths(ex, paths, currentPath);
//     }
//     return paths;
//   }
//   const isWithinCurrentPath = typeof currentPath === 'string';
//   // console.log(expr.type);
//   // console.log(JSON.stringify(expr, null, 4));
//   switch (expr.type) {
//     case 'path':
//       // start path
//       let currPath = isWithinCurrentPath ? currentPath : '';
//       // paths = getPaths(expr.steps!, paths, currPath);

//       // important loop that constructs steps into path
//       // would like to remove this loop and use recursion only..
//       for (const step of expr.steps!) {
//         // console.log(JSON.stringify(expr, null, 4));
//         // end early for wildcard and descendants
//         // console.log(paths, step.type, isWithinCurrentPath);
//         if (step.type === 'wildcard' || step.type === 'descendant') {
//           if (!currPath) {
//             const path: string = '/';
//             paths.push(path);
//           }
//           return paths;
//         }
//         // parents make it impossible to determine, so remove
//         if (step.type === 'parent') {
//           if (currPath) paths.splice(paths.length - 1, 1);
//           // add catch all path
//           const path: string = '/';
//           paths.push(path);
//           return paths;
//         }
//         paths = getPaths(step, paths, currPath);
//         if (paths.length) currPath = paths[paths.length - 1];
//       }
//       if ((expr as any).group) {
//         paths = getPaths(
//           { type: 'group', ...(expr as any).group },
//           paths,
//           currPath
//         );
//       }
//       break;
//     case 'apply':
//     case 'binary':
//     case 'bind':
//       //todo: determine if currentPath should be continued
//       paths = getPaths(expr.lhs!, paths, currentPath);
//       paths = getPaths(expr.rhs!, paths, currentPath);
//       break;
//     case 'unary':
//       // '-' '[' or '{'
//       if (expr.value === '[') {
//         //todo: determine if currentPath should be continued
//         paths = getPaths(expr.expressions!, paths, currentPath);
//         // paths = paths.concat(getPaths(expr.expressions!, paths, currentPath));
//       } else if (expr.value === '{') {
//         //todo: determine if currentPath should be continued
//         paths = getPaths(expr.lhs!, paths, currentPath);
//         paths = getPaths(expr.rhs!, paths, currentPath);
//       } else if (expr.value === '-') {
//         //todo: determine if currentPath should be continued
//         paths = getPaths((expr as any).expression, paths, currentPath);
//       }
//       break;
//     case 'variable':
//       // for now ignore variable, might be worth keeping track of at some point
//       // console.log('===INSPECT ME===');
//       // console.log(`\n-type: ${expr.type}`);
//       // console.log;
//       // console.log(JSON.stringify(expr, null, 4));
//       break;
//     case 'block':
//       paths = getPaths(expr.expressions!, paths, currentPath);
//       break;
//     case 'lambda':
//       //todo: determine if currentPath should be continued
//       paths = getPaths(expr.arguments!, paths, currentPath);
//       paths = getPaths((expr as any).body, paths, currentPath);
//       break;
//     case 'partial':
//     case 'function':
//       //todo: determine if currentPath should be continued
//       paths = getPaths(expr.arguments!, paths, currentPath);
//       paths = getPaths(expr.procedure!, paths, currentPath);
//       break;
//     case 'condition':
//       //todo: determine if currentPath should be continued
//       paths = getPaths((expr as any).condition, paths, currentPath);
//       paths = getPaths((expr as any).then, paths, currentPath);
//       paths = getPaths((expr as any).else, paths, currentPath);
//       break;
//     case 'transform':
//       //todo: determine if currentPath should be continued
//       paths = getPaths((expr as any).pattern, paths, currentPath);
//       paths = getPaths((expr as any).update, paths, currentPath);
//       paths = getPaths((expr as any).delete, paths, currentPath);
//       break;
//     case 'parent':
//       if (!currentPath) {
//         const path: string = '/';
//         paths.push(path);
//       }
//       break;
//     case 'descendant':
//     case 'wildcard':
//       if (!currentPath) {
//         const path: string = '/';
//         paths.push(path);
//       }
//       break;
//     case 'regex':
//     case 'value':
//     case 'string':
//     case 'number':
//       // not sure about..
//       break;
//     case 'filter':
//       // case 'sort':
//       paths = getPaths((expr as any).expr, paths, currentPath);
//       break;
//     case 'group':
//       paths = getPaths(expr.lhs!, paths, currentPath);
//       break;
//     case 'name':
//       if (isWithinCurrentPath) {
//         const path: string = currentPath + '/' + expr.value;
//         // remove the last path if the currentPath is still be evaluated
//         // console.log('splice', paths.length, currentPath);
//         if (
//           currentPath &&
//           paths.length &&
//           paths[paths.length - 1] === currentPath
//         ) {
//           // remove path being evaluated
//           paths.splice(paths.length - 1, 1);
//         }
//         // console.log(paths.length);
//         // console.log('pushing path', path);
//         // only push if it is a new path
//         if (!paths.includes(path)) paths.push(path);
//       }

//       // console.log(JSON.stringify(expr, null, 4));
//       if (expr.stages) {
//         paths = getPaths(expr.stages, paths, currentPath);
//         // console.log('stages: ', expr.stages);
//       }
//       // if nested path and previous path is a prefix, replace

//       break;
//   }
//   return paths;
// };

// //todo: remove and make actual tests
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
//   'Account[OrderID="order104"].*[OrderID="order104"].Product.Price',
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
//     const result = JSON.stringify(getPaths(ast), null, 4);
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
