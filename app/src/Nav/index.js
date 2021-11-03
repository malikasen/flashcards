import * as React from "react";

import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";

import { Nav, NavLink, Bars, NavMenu, NavBtn } from "./NavbarElements";
import styles from "./styles.module.scss";

const Navigation = ({ toggle }) => (
  <Nav>
    <NavLink to="/" end>
      <h3>Flashcard Master</h3>
    </NavLink>{" "}
    <Bars onClick={toggle} />
    <NavMenu>
      <NavLink to="practice" activeStyle>
        Practice
      </NavLink>
      <NavLink to="new-card" activeStyle>
        New card
      </NavLink>
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
