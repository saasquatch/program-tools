import * as jsonata from "jsonata";
interface PathContext {
  pathNode: jsonata.ExprNode;
  pathVariablesInScope: Record<string, PathContext>;
  stringVariablesInScope: Record<string, string>;
  methodsInScope: Record<string, jsonata.ExprNode>;
  pathId: Symbol;
  parentPathId?: Symbol;
}
const RootContextId = Symbol("ROOT");

const UnknownContextId = Symbol("UNKNOWN");

const createUnknownContext = (
  ast: jsonata.ExprNode,
  pathVariablesInScope: Record<string, PathContext>,
  stringVariablesInScope: Record<string, string>,
  methodsInScope: Record<string, jsonata.ExprNode>
) => {
  return {
    pathNode: ast,
    pathVariablesInScope: { ...pathVariablesInScope },
    stringVariablesInScope: { ...stringVariablesInScope },
    methodsInScope: { ...methodsInScope },
    pathId: UnknownContextId
  };
};

const createRootContext = (ast: jsonata.ExprNode) => {
  return {
    pathNode: ast,
    pathVariablesInScope: {},
    stringVariablesInScope: {},
    methodsInScope: {},
    pathId: RootContextId
  };
};

const isParentRootContext = (ctx: PathContext) =>
  ctx.parentPathId === RootContextId;

const isRootContext = (ctx: PathContext) => ctx.pathId === RootContextId;

// const isParentUnknownContext = (ctx: PathContext) =>
//   ctx.parentPathId === UnknownContextId;

const markContextAsUnaryUnlessRoot = (context: PathContext): PathContext => {
  if (context.pathId !== RootContextId) context.pathId = Symbol("UNARY");
  return context;
};

const isParentContextUnary = (context: PathContext) =>
  context.parentPathId?.description === "UNARY";

const reduceToPathString = (
  pathContext: PathContext,
  initialValue: string = "",
  stopAtPosition?: number,
  startAtPosition?: number
): string => {
  return (
    pathContext.pathNode.steps
      // todo: fold filters into reduce
      ?.filter(step =>
        typeof stopAtPosition === "number" && typeof step.position === "number"
          ? step.position < stopAtPosition
          : true
      )
      .filter(step =>
        typeof startAtPosition === "number" && typeof step.position === "number"
          ? step.position >= startAtPosition
          : true
      )
      .reduce((pathString, step, index, array) => {
        if (index === 0 && step.type === "variable") {
          if (step.value === "$") {
            // $$. means reset context to root
            pathContext.parentPathId = RootContextId;
            return "";
          } else if (step.value === "") {
            return "";
          } else if (pathContext.pathVariablesInScope[step.value]) {
            //look for variable in scope
            return (
              pathString +
              reduceToPathString(pathContext.pathVariablesInScope[step.value])
            );
          } else {
            // end early for unknown variables
            array.splice(index + 1);
            return pathString;
          }
        } else if (step.type === "name") {
          return pathString + "/" + step.value;
        } else if (
          step.type === "wildcard" ||
          step.type === "descendant" ||
          step.type === "parent"
        ) {
          // end early for unknown variables
          array.splice(index + 1);
          if (typeof stopAtPosition === "number") {
            return "";
          }
          return pathString;
        } else if (step.type === "unary" && index !== array.length - 1) {
          array.splice(index + 1);
          return "";
        } else if (step.type === "function") {
          array.splice(index + 1);
          return pathString;
        } else {
          return pathString;
        }
      }, initialValue) || initialValue
  );
};

const getPathStringFromPathContext = (
  pathContext: PathContext,
  allPathContexts: PathContext[],
  childPosition?: number,
  isNested: boolean = false
): string => {
  let pathString = isNested
    ? reduceToPathString(pathContext, undefined, childPosition)
    : reduceToPathString(pathContext);
  if (isParentRootContext(pathContext)) {
    return pathString;
  }
  const parentPathContext = allPathContexts.find(
    ctx => ctx.pathId === pathContext.parentPathId
  );
  if (!parentPathContext) return "";
  const parentPrePathString = getPathStringFromPathContext(
    parentPathContext,
    allPathContexts,
    childPosition,
    true
  );
  if (!parentPrePathString && !!reduceToPathString(parentPathContext))
    return "";
  if (isParentContextUnary(pathContext)) {
    const parentPostPathString = reduceToPathString(
      parentPathContext,
      undefined,
      undefined,
      childPosition
    );
    return parentPrePathString + pathString + parentPostPathString;
  }
  return parentPrePathString + pathString;
};

const getPathsFromPathContexts = (pathContexts: PathContext[]) => {
  const paths: string[] = [];
  for (const pathContext of pathContexts) {
    const pathString = getPathStringFromPathContext(
      pathContext,
      pathContexts,
      pathContext.pathNode.steps?.[0]?.position
    );
    if (pathString) paths.push(pathString);
  }
  return paths;
};

function getPathContextsFromAST(
  ast: jsonata.ExprNode | jsonata.ExprNode[] | undefined,
  pathContexts: PathContext[] = [],
  currentContext?: PathContext
): PathContext[] {
  if (!ast) return pathContexts;
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
    case "path":
      //start path
      const newContext: PathContext = {
        pathNode: ast,
        pathVariablesInScope: { ...currentContext.pathVariablesInScope },
        stringVariablesInScope: { ...currentContext.stringVariablesInScope },
        methodsInScope: { ...currentContext.methodsInScope },
        pathId: Symbol(),
        parentPathId: currentContext.pathId
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
    case "bind":
      if (
        ast.lhs &&
        ast.lhs.type === "variable" &&
        ast.rhs &&
        ast.rhs.type === "path"
      ) {
        currentContext.pathVariablesInScope = {
          ...currentContext.pathVariablesInScope,
          [ast.lhs.value]: {
            pathNode: ast.rhs,
            pathVariablesInScope: currentContext.pathVariablesInScope,
            stringVariablesInScope: currentContext.stringVariablesInScope,
            methodsInScope: currentContext.methodsInScope,
            pathId: Symbol(),
            parentPathId: currentContext.parentPathId
          }
        };
      }
      if (
        ast.lhs &&
        ast.lhs.type === "variable" &&
        ast.rhs &&
        ast.rhs.type === "string"
      ) {
        currentContext.stringVariablesInScope = {
          ...currentContext.stringVariablesInScope,
          [ast.lhs.value]: ast.rhs.value
        };
      }
      if (
        ast.lhs &&
        ast.lhs.type === "variable" &&
        ast.rhs &&
        ast.rhs.type === "lambda"
      ) {
        currentContext.methodsInScope = {
          ...currentContext.methodsInScope,
          [ast.lhs.value]: ast.rhs
        };
      }
      return getPathContextsFromAST(
        ast.rhs,
        getPathContextsFromAST(ast.lhs, pathContexts, currentContext),
        currentContext
      );
    case "apply":
    case "binary":
      return getPathContextsFromAST(
        ast.rhs,
        getPathContextsFromAST(ast.lhs, pathContexts, currentContext),
        currentContext
      );
    case "unary":
      if (ast.value === "[") {
        return getPathContextsFromAST(
          ast.expressions,
          pathContexts,
          markContextAsUnaryUnlessRoot(currentContext)
        );
      } else if (ast.value === "{") {
        return getPathContextsFromAST(
          ast.rhs,
          getPathContextsFromAST(ast.lhs, pathContexts, currentContext),
          currentContext
        );
      } else if (ast.value === "-") {
        return getPathContextsFromAST(
          (ast as any).expression,
          pathContexts,
          currentContext
        );
      }
      break;
    case "block":
      return getPathContextsFromAST(
        ast.expressions,
        pathContexts,
        currentContext
      );
    case "lambda":
    case "partial":
    case "function":
      if (
        ast.procedure?.value === "lookup" &&
        ast.arguments?.[0] &&
        (ast.arguments?.[0]?.type === "path" ||
          (ast.arguments?.[1]?.type === "variable" &&
            currentContext.pathVariablesInScope[ast.arguments?.[0]?.value])) &&
        ast.arguments?.[1] &&
        (ast.arguments?.[1]?.type === "string" ||
          (ast.arguments?.[1]?.type === "variable" &&
            currentContext.stringVariablesInScope[ast.arguments?.[1]?.value]))
      ) {
        // special handling of lookup, construct the lookup into a path
        const pathNode = {
          ...(ast.arguments?.[0]?.type === "path"
            ? ast.arguments?.[0]
            : currentContext.pathVariablesInScope[ast.arguments?.[0]?.value]
                ?.pathNode)
        };
        const fauxNameNode = {
          type: "name",
          position: ast.arguments?.[1]?.position,
          value:
            ast.arguments?.[1]?.type === "string"
              ? ast.arguments?.[1]?.value
              : currentContext.stringVariablesInScope[ast.arguments?.[1]?.value]
        };
        pathNode.steps = [...(pathNode.steps || []), fauxNameNode];
        return getPathContextsFromAST(pathNode, pathContexts, currentContext);
      }
      if (currentContext.methodsInScope[ast.procedure?.value]) {
        // remap variables
        const lambdaDef = currentContext.methodsInScope[ast.procedure?.value];
        const additionalPaths: Record<string, PathContext> = {};
        const additionalStrings: Record<string, string> = {};
        // todo additional methods
        (ast.arguments || []).forEach((arg, index) => {
          const variableName: string = lambdaDef.arguments?.[index]?.value;
          if (!variableName) return;
          if (arg.type === "path") {
            additionalPaths[variableName] = {
              pathNode: arg,
              pathVariablesInScope: currentContext!.pathVariablesInScope,
              stringVariablesInScope: currentContext!.stringVariablesInScope,
              methodsInScope: currentContext!.methodsInScope,
              pathId: Symbol(),
              parentPathId: currentContext!.parentPathId
            };
          }
          if (arg.type === "string") {
            additionalStrings[variableName] = arg.value;
          }
        });
        if (
          Object.keys(additionalPaths).length ||
          Object.keys(additionalStrings).length
        ) {
          pathContexts = getPathContextsFromAST(
            (lambdaDef as any).body,
            pathContexts,
            {
              ...currentContext,
              pathVariablesInScope: {
                ...currentContext.pathVariablesInScope,
                ...additionalPaths
              },
              stringVariablesInScope: {
                ...currentContext.stringVariablesInScope,
                ...additionalStrings
              }
            }
          );
        }
      }
      const ex = ast.type === "lambda" ? (ast as any).body : ast.procedure;
      return getPathContextsFromAST(
        ex,
        getPathContextsFromAST(ast.arguments, pathContexts, currentContext),
        currentContext
      );
    case "condition":
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
    case "transform":
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
    case "parent":
    case "descendant":
    case "wildcard":
      return getPathContextsFromAST(
        ast.stages,
        pathContexts,
        createUnknownContext(
          currentContext.pathNode,
          currentContext.pathVariablesInScope,
          currentContext.stringVariablesInScope,
          currentContext.methodsInScope
        )
      );
    case "variable":
    case "regex":
    case "value":
    case "string":
    case "number":
      break;
    case "filter":
      return getPathContextsFromAST(
        (ast as any).expr,
        pathContexts,
        currentContext
      );
    case "sort":
      return getPathContextsFromAST(
        ((ast as any).terms || []).map((term: any) => term.expression),
        pathContexts,
        currentContext
      );
    case "name":
      if (isRootContext(currentContext)) {
        const nameContext: PathContext = {
          pathNode: { position: ast.position, type: "path", steps: [ast] },
          pathVariablesInScope: { ...currentContext.pathVariablesInScope },
          stringVariablesInScope: { ...currentContext.stringVariablesInScope },
          methodsInScope: { ...currentContext.methodsInScope },
          pathId: Symbol(),
          parentPathId: currentContext.pathId
        };
        pathContexts.push(nameContext);
      }
      return getPathContextsFromAST(ast.stages, pathContexts, currentContext);
  }
  return pathContexts;
}

const getJsonataASTSafe = (
  expression: string
): jsonata.ExprNode | undefined => {
  try {
    return jsonata.default(expression).ast();
  } catch (e) {
    return;
  }
};

export default function(expression: string): string[] {
  const ast = getJsonataASTSafe(expression);
  if (!ast) return [];
  return getPathsFromPathContexts(getPathContextsFromAST(ast));
}
