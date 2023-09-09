import { useEffect } from 'react';

import Header from '@components/Header'
import Footer from "@components/Footer"

const LayoutClient = ({children, title}) => {

  useEffect(() => {
    document.title = title ? `아망떼 | ${title}` : "아망떼";
  }, [title]);

  return (
    <>
      <Header/>
        <main>{children}</main>
      <Footer />
    </>
  )
}

export default LayoutClient