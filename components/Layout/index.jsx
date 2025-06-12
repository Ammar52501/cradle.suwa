
import Navbar from "../Navbar";
import Footer from "../Footer";
import localFont from 'next/font/local'
import { useRouter } from "next/router";


export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      {router.pathname.includes('year-of-arabic-poetry') || router.pathname !== '/search' &&
        <Navbar />
      }
      <main >
        {children}
      </main >
      {router.pathname !== '/search' &&
        <Footer />
      }
    </>
  )
}