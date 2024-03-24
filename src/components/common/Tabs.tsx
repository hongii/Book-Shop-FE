import React, { useState } from "react";
import styled from "styled-components";

interface TabProps {
  title: string;
  children: React.ReactNode;
}
const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

interface TabsProps {
  children: React.ReactNode;
  active?: number;
}

const Tabs = ({ children, active = 0 }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(active);
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];

  return (
    <TabsStyle>
      <div className="tab-header">
        {tabs.map((tab, i) => (
          <button
            key={tab.props.title}
            className={activeIndex === i ? "active" : ""}
            onClick={() => setActiveIndex(i)}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex]}</div>
    </TabsStyle>
  );
};

const TabsStyle = styled.div`
  width: 100%;
  .tab-header {
    display: flex;
    gap: 0.2rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    button {
      cursor: pointer;
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: 4px 4px 0 0;
      background-color: ${({ theme }) => theme.buttonScheme.normal.backgroundColor};
      color: ${({ theme }) => theme.color.primary};

      &.active {
        background-color: ${({ theme }) => theme.buttonScheme.primary.backgroundColor};
        color: ${({ theme }) => theme.color.inputText};
      }
    }
  }
  .tab-content {
    padding: 1rem 0.5rem;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    button {
      font-size: 2.5rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    button {
      font-size: 2rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    button {
      font-size: 1.5rem;
    }
  }
`;

export { Tab, Tabs };
