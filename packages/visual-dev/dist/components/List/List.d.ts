import * as React from "react";
import { CSSProp } from "styled-components";
export interface ListProps {
    /**
     * Choose a bullet or numbered list type [default "bullet"]
     */
    type?: "bullet" | "number";
    /**
     * List content, usually List.Item
     */
    children?: React.ReactNode;
    /**
     * Custom CSS applied to the list container
     */
    customCSS?: CSSProp;
}
declare const ListNamespace: React.FC<ListProps> & {
    ItemView: import("styled-components").StyledComponent<"li", any, {}, never>;
};
/**
 * @deprecated use {@link ListView} instead
 */
declare const ListNamespaceDeprecated: React.FC<ListProps> & {
    Item: import("styled-components").StyledComponent<"li", any, {}, never>;
};
export { ListNamespace as ListView };
/**
 * @deprecated use {@link ListView} instead
 */
export { ListNamespaceDeprecated as List };
