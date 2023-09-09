import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
 
const ScrollTop = () => {
  const {pathname, search} = useLocation()
  const fullQuery = search.toString()

  useEffect(() => {
    window.scrollTo(0,0)
  }, [pathname, fullQuery]);
}

export default ScrollTop