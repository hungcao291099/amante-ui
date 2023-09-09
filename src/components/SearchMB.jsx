import $ from 'jquery';
import { Link } from 'react-router-dom';

const SearchMB = ({ state, keywords, keywordProc, navigate }) => {
  const { setShowSearchMB } = state;

  const searchProductHandler = () => {
    const searchText = $('.search-text-mb').val();
    keywordProc(null, 'ADD', searchText);
    navigate(`/shop/search_product/search_product_lists?keyword=${searchText}`)
    setShowSearchMB(false)
  };

  return (
    <section className="search-form-mb">
      <div className="search-area d-flex justify-content-between align-items-center">
        <span onClick={() => setShowSearchMB(false)} className="close">
          닫기
        </span>

        <div className="d-flex justify-content-between gap-2 align-items-center form">
          <input className="search-text-mb srch_close_event" type="text" placeholder="검색어를 입력해주세요" />
          <button
            className="d-flex align-items-center justify-content-center"
            onClick={() => $('.search-text-mb').val('')}
          >
            <img src="/images/concept-room/icon/btn_del.png" alt="" />
          </button>
        </div>

        <img
          onClick={searchProductHandler}
          src="/images/concept-room/icon/search-icon.png"
          alt=""
        />

        {keywords.length > 0 && (
          <div className="search_lists_wrap mb">
            <div className="d-flex mb-3 justify-content-between wrap-button">
              <button type="button">최근검색어</button>
              <button type="button" className="search_del_btn" onClick={() => keywordProc()}>
                전체삭제
              </button>
            </div>
            <ul className="search_lists">
              {keywords?.map((keyword, index) => (
                <li key={index} className="d-flex align-items-center">
                  <Link onClick={() => setShowSearchMB(false)} to={`/shop/search_product/search_product_lists?keyword=${keyword.keyword}`}>
                    {keyword.keyword}
                  </Link>
                  <button type="button" onClick={() => keywordProc(keyword.keyword_seq, 'DEL')}>
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchMB;
