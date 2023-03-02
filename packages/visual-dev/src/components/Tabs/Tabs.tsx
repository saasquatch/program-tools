import * as React from "react";
import * as Styles from "./Styles";
import styled from "styled-components";

type TabsContextType = [string | undefined, undefined | Function];
const TabsContext = React.createContext<TabsContextType>([
  undefined,
  undefined,
]);

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

const TabView: React.FC<TabViewProps> = ({ id, disabled, children }) => {
  const [selected, setId] = useTabs();

  return (
    <div
      className={`tab${selected == id ? " active" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={() => !disabled && setId!(id)}
    >
      {children}
    </div>
  );
};

export interface TabsProps {
  /**
   * Currently selected tab, by tab id
   */
  selected?: string;
  /**
   * Callback triggered when the tab is clicked, passed the tab id
   */
  onTabClick: (tab: string) => void;
  /**
   * Custom styling applied to the tabs container
   */
  customTabStyle?: any;
  /**
   * Content of the Tabs container, typically a number of TabView components
   */
  children: React.ReactNode;
}

function useTabs() {
  const cxt = React.useContext(TabsContext);
  if (!cxt) throw new Error("Tab must be within Tabs component");

  return cxt;
}

const StyledTabsContainerDiv = styled.div<{ customStyle?: any }>`
  ${Styles.root}
  & > .tab {
    ${Styles.Tab}
    ${({ customStyle }) => (customStyle ? customStyle : Styles.defaultTabStyle)}
  }
`;

const TabsView: React.FC<TabsProps> = ({
  selected,
  onTabClick,
  customTabStyle,
  children,
}) => {
  return (
    <TabsContext.Provider value={[selected, onTabClick]}>
      <StyledTabsContainerDiv customStyle={customTabStyle}>
        {children}
      </StyledTabsContainerDiv>
    </TabsContext.Provider>
  );
};

const TabsNamespace = Object.assign(TabsView, {
  TabView: TabView,
});

/**
 * @deprecated use {@link TabsView} instead
 */
const TabsNamespaceDeprecated = Object.assign(TabsView, {
  Tab: TabView,
});

export { TabsNamespace as TabsView };

/**
 * @deprecated use {@link TabsView} instead
 */
export { TabsNamespaceDeprecated as Tabs };
