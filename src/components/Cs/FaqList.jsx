import { koApiURL } from "@utils/constants";
import React, { useEffect, useState, useContext } from 'react';

import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";


const FaqList = ({numbPage}) => {

const [faqList, setFaqList] = useState()

  useEffect(() => {
    $.get({
			url: `${koApiURL}/board/faq/faq_lists`,
			async: false,
			type: 'GET',
			data: {
				'page': numbPage,
			},
			success: function(res) {
        
        setFaqList(res.data)
			},
			error: function(error) {
				return console.log(error)
			}
		});
  }, []);
  return (
    <div >
          {faqList?.map((item, index) => (
              <li key={index}>
             <button type="button" className="q" id={`${item.no}`}>
                <span>
                    <em>{item.code_nm2}</em>
                    {item.title}
                </span>
            </button>
            <div className="a">
                <div className="con">
                {item.content}
                </div>
            </div>
              </li>
          ))}
    </div>	
  )
}

export default FaqList