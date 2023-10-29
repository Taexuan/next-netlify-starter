import '@styles/globals.css'
import AuthContextProvider from "@contexts/authContext"
import Navbar from "@components/Navbar";

function Application({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default Application
