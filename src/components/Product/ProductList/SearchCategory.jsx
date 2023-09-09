import React from 'react';
import { Link } from 'react-router-dom';
import { useConceptRoomContext } from '@contexts/ConceptRoomContext';

const SearchCategory = ({ categoryTotal, keyword, shCate1Cd, shCate2Cd, parse }) => {
  const {isMobile} = useConceptRoomContext()
  const handleMoreClick = () => {
    const srchCategory = document.querySelector('.srch_category');
    srchCategory.classList.toggle('on');

    const cateBtn = document.querySelector('.cate_btn .more');
    if (srchCategory.classList.contains('on')) {
      cateBtn.classList.add('on');
      cateBtn.querySelector('span').textContent = '접기';
    } else {
      cateBtn.classList.remove('on');
      cateBtn.querySelector('span').textContent = '더보기';
    }
  };

  return (
    <>
      <div
        className={`srch_category ${
          categoryTotal?.length > 6 && isMobile ? 'max' : ''
        }`}
      >
        <ul>
          {categoryTotal?.map((cate, index) => {
            return (
              <li
                id={cate.cate_cd}
                key={index}
                className={
                  shCate2Cd === Number(cate.cate_cd2)
                    ? 'on'
                    : shCate1Cd === 150 && Number(cate.cate_cd1) === 150
                    ? 'on'
                    : ''
                }
              >
                <Link
                  to={`/shop/search_product/search_product_lists?keyword=${keyword}&sh_category1_cd=${cate.cate_cd1}&sh_category2_cd=${cate.cate_cd2}`}
                >
                  {cate?.cate_nm2 ? parse(cate.cate_nm2) : parse(cate.cate_nm1)}({cate.cnt})
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="cate_btn"
        style={{
          display: categoryTotal?.length > 6 && isMobile ? 'block' : 'none',
        }}
      >
        <button onClick={handleMoreClick} type="button" className={`more `}>
          <span>더보기</span>
        </button>
      </div>
    </>
  );
};

export default SearchCategory;
