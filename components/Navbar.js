import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@contexts/authContext";

const NavBar = () => {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <nav>
      <Link href="/">
        Home
      </Link>
      <Link href="/about">
        About
      </Link>
      <li>{!user && <button onClick={login}>Login/Signup</button>}</li>
      <li>{user && <button onClick={logout}>Logout</button>}</li>
    </nav>
  );
};

export default NavBar;