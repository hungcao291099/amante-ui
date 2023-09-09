import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import 'swiper/css';
import CommuTab from '@components/CommuTab';




const Inquiry = () => {

  return (
    <div>
      <CommuTab/>
      <div className="content cs inquiry_page">
          <div className="inner">
              <picture className="con_img">
                  <source srcset={`/asset/images/shop/cs/mb_inquiry.jpg`} media="(max-width:767px)"></source>
                  <source srcset={`/asset/images/shop/cs/pc_inquiry.jpg`} media="(min-width:768px)"></source>
                  <img src={`/asset/images/shop/cs/pc_inquiry.jpg`} alt="대량구매/제휴/입점문의"></img>
              </picture>
          </div>
      </div>
    </div>
  );
};

export default Inquiry;




