import * as React from "react";
export interface TabViewProps {
    /**
     * Unique identifier for the given tab
     */
    id: string;
    /**
     * Content displayed to represent the tab, typically a label
     */
    children: React.ReactNode;
    /**
     * Disable switching to the given tab
     */
    disabled?: boolean;
}
export interface TabsProps {
    /**
     * Currently selected tab, by tab id
     */
    selected?: string;
    /**
     * Callback triggered when the tab is clicked, passed the tab id
     */
    onTabClick: (id: string) => void;
    /**
     * Custom styling applied to the tabs container
     */
    customTabStyle?: any;
    /**
     * Content of the Tabs container, typically a number of TabView components
     */
    children: React.ReactNode;
}
declare const TabsNamespace: React.FC<TabsProps> & {
    TabView: React.FC<TabViewProps>;
};
declare const TabsNamespaceDeprecated: React.FC<TabsProps> & {
    Tab: React.FC<TabViewProps>;
};
export { TabsNamespace as TabsView };
/**
 * @deprecated use {@link TabsView} instead
 */
export { TabsNamespaceDeprecated as Tabs };
