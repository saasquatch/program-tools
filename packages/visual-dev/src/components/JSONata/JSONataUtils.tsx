import { ConditionEditorProps, AST } from "jsonata-visual-editor";
import { JsonataASTNode } from "jsonata-ui-core";
import jsonata, { ExprNode } from "jsonata";

const JSONataUtils = {
  getKeys(value: ExprNode, props: any) {
    const { isCustomField, conversionRule } = props;
    try {
      const keys =
        !isCustomField &&
        conversionRule !== "referral" &&
        value &&
        jsonata(
          `[**[type="binary" 
      and value = "="
      and lhs.type = "path" 
      and lhs.steps[type="name"].value=["event","key"]
      ].rhs[type="string"].value ~> $distinct()]`
        ).evaluate(value);
      return keys;
    } catch (error) {
      return null;
    }
  },

  isValidBasicExpression(newValue: AST): string | null {
    const NodeWhitelist = jsonata(`**[type = "function"]`);
    const unaryWithCondition = jsonata(`type = "unary" and lhs`);
    try {
      if (NodeWhitelist.evaluate(newValue)) {
        return "Functions are not allowed in basic mode.";
      } else if (unaryWithCondition.evaluate(newValue)) {
        return "Object mappings with conditions are not allowed in basic mode.";
      }
    } catch (e) {}
    return null;
  },

  containsRootLevelSelect(value: string) {
    const re = /([:( =><]|^)select([ =><.?!)]|$)(?=(?:[^"]*"[^"]*")*[^"]*$)/;
    return re.test(value);
  },

  addRule(currentChildren: ConditionEditorProps["children"]) {
    const newCondition = jsonata('select = ""').ast();
    const lastChild = currentChildren[currentChildren.length - 1];
    const newTier = jsonata('""').ast();
    let newAst = {
      ...lastChild.ast,
      else: {
        type: "condition",
        condition: newCondition,
        then: newTier,
      },
    } as JsonataASTNode;

    lastChild.onChange(newAst as JsonataASTNode);
  },

  removeRule(
    pair: any,
    children: ConditionEditorProps["children"],
    elseEditor?: ConditionEditorProps["elseEditor"]
  ) {
    children.forEach((child) => {
      if (pair.Then.props.ast.value === child.Then.props.ast.value) return;
    });
    if (elseEditor) elseEditor.props.ast.value = null;
  },
};

export default JSONataUtils;
