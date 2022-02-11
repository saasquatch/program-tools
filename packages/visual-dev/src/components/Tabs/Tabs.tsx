import * as React from 'react';
import * as Styles from './Styles'
import styled from 'styled-components';

type TabsContextType = [string | undefined, undefined | Function]
const TabsContext = React.createContext<TabsContextType>([undefined, undefined]) 

export const Tab: React.FC<{id: string, children: React.ReactNode}> = ({
  id,
  children
}) => {
  const [selected, setId] = useTabs()

  return (
    <div
      className={`tab${selected == id ? " active" : ""}`}
      onClick={() => setId!(id)}
    >
     {children}
    </div>
  )
}

export interface TabsProps {
  selected?: string;
  onTabClick: (id: string) => void
  customTabStyle?: any
  children: React.ReactNode
}

function useTabs() {
  const cxt = React.useContext(TabsContext)
  if (!cxt) throw new Error("Tab must be within Tabs component")

  return cxt
}

const StyledTabsContainer = styled.div<{customStyle?: any}>`
  ${Styles.root}
  & > .tab {
    ${Styles.Tab}
    ${({customStyle}) => customStyle ? customStyle : null}
  }
`

export const Tabs: React.FC<TabsProps> & { Tab: typeof Tab } = ({
  selected,
  onTabClick,
  customTabStyle,
  children
}) => {
  return (
    <TabsContext.Provider value={[selected, onTabClick]}>
      <StyledTabsContainer customStyle={customTabStyle}>
        {children}
      </StyledTabsContainer>
    </TabsContext.Provider>
  )
}

Tabs.Tab = Tab
