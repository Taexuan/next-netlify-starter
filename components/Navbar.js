import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@contexts/authContext";

const NavBar = () => {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <li>{!user && <button onClick={login}>Login/Signup</button>}</li>
      <li>{user && <button onClick={logout}>Logout</button>}</li>
    </nav>
  );
};

export default NavBar;