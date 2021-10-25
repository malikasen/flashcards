import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";

import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";

import styles from "./styles.module.scss";

const Nav = () => (
  <nav className={styles.nav}>
    <Grid container>
      <Grid item xs={1} className={styles.grid0}>
        <h3>Flashcard Master</h3>
      </Grid>
      <Grid item xs={10} className={styles.grid1}>
        <NavLink to="/" end>
          Home
        </NavLink>{" "}
        <NavLink to="practice">Practice</NavLink>
        <NavLink to="create-edit-card">New card</NavLink>
      </Grid>
      <Grid item xs={1} className={styles.grid2}>
        <Auth />
      </Grid>
    </Grid>
  </nav>
);

const Auth = () => {
  const { isAuthenticated, user } = useAuth0();

  return isAuthenticated ? (
    <>
      <img src={user.picture} alt="" />
      <Logout />
    </>
  ) : (
    <Login />
  );
};

export default Nav;
