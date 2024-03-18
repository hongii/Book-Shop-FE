import useOnClickOutside from "@/hooks/useOnClickOutside";
import React, { useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  toggleButtonIcon: React.ReactNode;
  isOpen?: boolean;
}

const Dropdown = ({ children, toggleButtonIcon, isOpen = false }: Props) => {
  const [open, setOpen] = useState(isOpen);
  const dropdouwnRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdouwnRef, () => {
    setOpen(false);
  });

  return (
    <DropdownStyle ref={dropdouwnRef}>
      <div>
        <button className="toggle" onClick={() => setOpen((prev) => !prev)}>
          {toggleButtonIcon}
        </button>
      </div>
      {open && (
        <div className="panel">
          <div className="rhombus"></div>
          {children}
        </div>
      )}
    </DropdownStyle>
  );
};

const DropdownStyle = styled.div`
  position: relative;

  .toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    padding: 0;
    border: none;
    cursor: pointer;
    outline: none;

    svg,
    path,
    circle {
      width: 2.4rem;
      height: 2.4rem;
      fill: ${({ theme }) => theme.color.authIconColor};
    }
  }

  .panel {
    position: absolute;
    top: 3.35rem;
    right: -1rem;
    background-color: ${({ theme }) => theme.color.background};
    box-shadow: ${({ theme }) => theme.borderShadow.listShadow};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    border: 1px solid ${({ theme }) => theme.color.border};
    z-index: 100;
  }

  .rhombus::before {
    display: inline-block;
    position: absolute;
    content: "";
    width: 1.25rem;
    height: 1.25rem;
    top: -0.65rem;
    right: 1.3rem;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.color.background};
    border: 1px solid ${({ theme }) => theme.color.border};
    border-right: none;
    border-bottom: none;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .toggle {
      font-size: 2rem;
      width: 3.7rem;
      height: 3.7rem;

      svg,
      path,
      circle {
        width: 3.7rem;
        height: 3.7rem;
        fill: ${({ theme }) => theme.color.authIconColor};
      }
    }
    .panel {
      top: 5rem;
      right: 0rem;
    }
  }
`;

export default Dropdown;
