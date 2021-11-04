import * as React from "react";

import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";

import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
} from "./SidebarElements";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/">Home</SidebarLink>
          <SidebarLink to="practice">Practice</SidebarLink>
          <SidebarLink to="new-card">New Card</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <Auth />
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

const Auth = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <>
      <Logout />
    </>
  ) : (
    <Login />
  );
};

export default Sidebar;
