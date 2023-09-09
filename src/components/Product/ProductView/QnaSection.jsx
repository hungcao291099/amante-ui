import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const QnaSection = ({ productView, cust_seq, productCd, api }) => {
  const [page, setPage] = useState(1);
  const [qnaList, setQnaList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: '/shop/qna/list',
          method: 'GET',
          params: { page, product_cd: productCd },
        });
        setQnaList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page]);

  if (page === 1 && productView?.qna_count < 6) {
    $('#tab_qna .btn_area').hide();
  } else if (page > 1 && productView?.qna_count < 6) {
    alert('마지막 글입니다.');
    $('#tab_qna .btn_area').hide();
  } else {
    $('#tab_qna .btn_area').show();
  }

  return (
    <div className="tab_con" id="tab_qna">
      <div className="tab_title">
        <h3>문의 {productView?.qna_count}</h3>
        {cust_seq ? (
          <Link to={`/shop/help/help_write?product_cd=${productCd}`} className="more_btn">
            문의하기
          </Link>
        ) : (
          <Link to={`/shop/login/login`} className="more_btn">
            문의하기
          </Link>
        )}
      </div>
      <ul className="qa_list">
        {qnaList.length > 0 ? (
          qnaList?.map((qna, index) => (
            <li key={index}>
              <div className="qa_info">
                <span className="type">{qna.code_nm2}</span>
                <span className="id">{qna.writer_id.substring(0, 4)}***</span>
                <span className="data">{qna.reg_date.substring(0, 11)}</span>
                {qna.content ? (
                  <span className="answer end">답변 완료</span>
                ) : (
                  <span className="answer">미답변</span>
                )}
              </div>
              <div className="qa_con">
                {qna.password === 'Y' ? (
                  <span className="hide">비공개 문의입니다.</span>
                ) : (
                  qna.title
                )}
              </div>
            </li>
          ))
        ) : (
          <li>
            <div className="nodata">문의한 내용이 없습니다.</div>
          </li>
        )}
      </ul>

      <div className="btn_area">
        <button
          className="btn_txt btn_arrow"
          onClick={() => {
            if (productView.qna_count === qnaList.length) {
              return alert('마지막 글입니다.');
            } else {
              setPage((prev) => prev + 1);
            }
          }}
        >
          <span>문의 더 보기</span>
        </button>
      </div>
    </div>
  );
};

export default QnaSection;
