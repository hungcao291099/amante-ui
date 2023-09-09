import { koApiURL } from "@utils/constants";
import React, { useEffect, useState, useContext } from 'react';

import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";




const Banner = ({item}) => {
  const { baseUrl } = useContext(CdnContext);
 

  

  return (
    <div className="slide">
       <a href={`${item.link}`} >
      <div className="img">
      <picture>
            <source srcSet={`${baseUrl}/uploads/banner/${item.file_nm1}`} media="(min-width:768px)" />
            <source  srcSet={`${baseUrl}/uploads/banner/${item.file_nm2}`} media="(max-width:767px)" />
            <img  src={`${baseUrl}/uploads/banner/${item.file_nm1}`} />
       </picture>
      </div>
    </a>
  </div>
    
  )
}

export default Banner