import Header from './Header';
import Footer from './Footer';
import { noLayoutPath, importPath, tagPath, noHeaderPath } from '@utils/constants';
import { checkDevice } from '@utils/functions';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import $ from 'jquery';

export default ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if(pathname.includes("manager")) {
      const file = document.getElementById("layout");
      const file_2 = document.getElementById("user_concept_room");
      if(file) file.remove();
      if(file_2) file_2.remove();
    }

    if (importPath.includes(pathname)) {
      tagPath.forEach((css) => {
        const file = document.createElement(css.tag);
        file.setAttribute('rel', css.rel);
        file.setAttribute('type', css.type);
        file.setAttribute('href', css.path);
        if (css.media !== '') {
          file.setAttribute('media', css.media);
        }

        document.head.appendChild(file);
      });
    }

    if(pathname.includes("manager")) {
        document.getElementById("root").style.overflow = "unset"
    }

    $('.nav-mb').css('display', 'block');
  }, [pathname]);

  return (
    <>
      {noLayoutPath.includes(pathname) || pathname.startsWith("/manager/concept-room/edit") ? (
        <>{children}</>
      ) : (
        <>
          <Header />
          {noHeaderPath.includes(pathname) && checkDevice() !== 'desktop' ? (
            <section style={{padding: 0}} id="contents">{children}</section>
          ) : (
            <section id="contents">{children}</section>
          )}
          <Footer />
        </>
      )}
    </>
  );
};
