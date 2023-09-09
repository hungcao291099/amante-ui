import { koApiURL } from "@utils/constants";
import React, { useEffect, useState, useContext } from 'react';

import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";
import FaqListComponent from "@components/Cs/FaqList";



const FaqList = ({}) => {
  const [getFaqCodeList, setFaqCodeList] = useState();
  
  var numbPage  = 1;
  useEffect(() => {
    $.get({
			url: `${koApiURL}/board/faq/faq_code_lists`,
			async: false,
			type: 'GET',
			data: {},
			success: function(res) {
        
        setFaqCodeList(res.data)
			},
			error: function(error) {
				return console.log(error)
			}
		});
  }, []);
  return (
    <div className="content cs faq_lists_page">
        <div className="inner">
            <h2 className="page_tit">자주 묻는 질문(FAQ)</h2>
            <div className="form-faq">
            <input type="hidden" name="no" value="" />
                <div className="cate_menu">
                    <div className="design_box">
                        <input type="radio" name="category" id="cate_all" title=""  value="all" />
                        <label >전체보기</label>
                    </div>
                    {getFaqCodeList?.map((item, index) => (
                     <div className="design_box" key={index}>
                            <input type="radio" name="category" id="cate_m0" title="" value={`${item.code_cd2}`} />
                            <label >{item.code_nm2}</label>
                      </div>
                    ))}
                </div>
                <div className="sch_top">
                    <div className="select_box">
                        <select name="key" id="key">
                            <option value="all"  >전체</option>
                            <option value="title"  >제목</option>
                            <option value="content"  >내용</option>
                        </select>                
                    </div>
                    <div className="search_box">
                        <input type="text"  name="keyword" id="keyword" />
                        <button type="button" className="btn" >검색</button>
                    </div>
                </div>
                <input type="hidden" name="page" id="page" value="1"  />
            </div>
            <ul className="faq_lists">
            <FaqListComponent numbPage={numbPage}/>
            </ul>
            <div className="page_num">
                <div className="btn_area view_more">
                    <button type="button"  id="more_btn" className="btn_txt btn_arrow"><span>더보기</span></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FaqList