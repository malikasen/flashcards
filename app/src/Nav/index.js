import * as React from "react";

import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";
import logo from "../images/Pomni-logos_transparent.png";

import { Nav, NavLink, Bars, NavMenu, NavBtn } from "./NavbarElements";
import styles from "./styles.module.scss";

const Navigation = ({ toggle }) => (
  <Nav>
    <NavLink to="/" end>
      <img className={styles.logo} src={logo} alt="Pomni logo"></img>
    </NavLink>{" "}
    <Bars onClick={toggle} />
    <NavMenu>
      <NavLink to="practice">Practice</NavLink>
      <NavLink to="new-card">New card</NavLink>
    </NavMenu>
    <NavBtn>
      <Auth />
    </NavBtn>
  </Nav>
);

const Auth = () => {
  const { isAuthenticated, user } = useAuth0();

  return isAuthenticated ? (
    <>
      <img className={styles.authImage} src={user.picture} alt="" />
      <Logout />
    </>
  ) : (
    <Login />
  );
};

export default Navigation;
