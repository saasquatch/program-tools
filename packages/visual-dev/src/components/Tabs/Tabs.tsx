import * as React from "react";
import * as Styles from "./Styles";
import styled from "styled-components";

type TabsContextType = [string | undefined, undefined | Function];
const TabsContext = React.createContext<TabsContextType>([
  undefined,
  undefined,
]);

const TabView: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const [selected, setId] = useTabs();

  return (
    <div
      className={`tab${selected == id ? " active" : ""}`}
      onClick={() => setId!(id)}
    >
      {children}
    </div>
  );
};

export interface TabsProps {
  selected?: string;
  onTabClick: (id: string) => void;
  customTabStyle?: any;
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

const TabsNamespaceDeprecated = Object.assign(TabsView, {
  Tab: TabView,
});

export { TabsNamespace as TabsView };

/**
 * @deprecated use {@link TabsView} instead
 */
export { TabsNamespaceDeprecated as Tabs };
