import Navbar from "../Navbar";
import Footer from "../Footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { pathname } = useRouter();

  return (
    <>
      {pathname.includes("year-of-arabic-poetry") ||
        (pathname !== "/search" && <Navbar />)}
      <main>{children}</main>
      {pathname !== "/search" && <Footer />}
    </>
  );
}
