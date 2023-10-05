import { Link } from 'react-router-dom';

import { formatNumber, likeProduct } from '@utils/functions';
import parse from 'html-react-parser';
import { CdnContext } from '@contexts/cdnContext';
import { useContext } from 'react';

const Item = ({ item, product, codes, lastRef, cust_seq, navigate }) => {
  const { baseUrl } = useContext(CdnContext);

  return (
    <li ref={lastRef}>
      <div className="box">
        <div className="img_area">
          <div className="img js_list_img">
            {item? (
              
                <Link
                  
                  to={`/shop/product/${
                    item.group_yn === 'Y' ? 'product_deal_view' : 'product_view'
                  }?product_cd=${item.product_cd}`}
                  data-val={item.product_cd}
                  className="a_or_wish"
                >
                  <picture>
                    {/*[if IE 9]><video style="display: none;"><![endif]*/}
                    <source
                      srcSet={baseUrl + `/uploads/product/285/${item}`}
                      media="(min-width:768px)"
                    />
                    {/* pc이미지 */}
                    <source
                      srcSet={baseUrl + `/uploads/product/285/${item}`}
                      media="(max-width:767px)"
                    />
                    {/* mb이미지 */}
                    {/*[if IE 9]></video><![endif]*/}
                    {item.file?.length >0 ? <img src={baseUrl + `/uploads/product/285/${item.file[0].file_nm}`} alt="" />:<img src="/asset/images/shop/product/pro_in_img.jpg" alt="" loading="lazy" />}
                    
                    {/* pc이미지 */}
                  </picture>
                </Link>
              )
             : (
              <picture>
                {/*[if IE 9]><video style="display: none;"><![endif]*/}
                <source
                  srcSet="/asset/images/shop/product/pro_in_img.jpg"
                  media="(min-width:768px)"
                />
                {/* pc이미지 */}
                <source
                  srcSet="/asset/images/shop/product/pro_in_img.jpg"
                  media="(max-width:767px)"
                />
                {/* mb이미지 */}
                {/*[if IE 9]></video><![endif]*/}
                
                {/* pc이미지 */}
              </picture>
            )}
          </div>
          <button
            type="button"
            className={`btn_wish ${item.wish_click_on} wish_${item.product_cd}`}
            onClick={() => {
              if (product) {
                if (cust_seq) {
                  likeProduct(item.product_cd, cust_seq);
                } else {
                  alert('로그인해야 합니다.');
                  return navigate('/shop/login/login');
                }
              }
            }}
          >
            위시리스트 담기
          </button>
        </div>
        <Link
          to={`/shop/product/${
            item.group_yn === 'Y' ? 'product_deal_view' : 'product_view'
          }?product_cd=${item.product_cd}`}
          data-val={item.product_cd}
        >
          <p className="tit">{item.product_nm && parse(item.product_nm)}</p>
        </Link>
        <p className="price">
          {
          
          item.supply_price === item.sale_price ? (<ins>{formatNumber(item.supply_price)}</ins>):(
           <>
              <del>{formatNumber(item.supply_price)}</del>{" "}
              <span>{Math.round(((item.supply_price - item.sale_price) / item.supply_price) * 100)}%</span>
              <ins>{formatNumber(item.sale_price)}</ins>
           </>
          )}
          {/* {item.supply_price !== item.sale_price ? (
            <del>{formatNumber(item.supply_price)}</del>
          ) : (
            <ins>{formatNumber(item.sale_price)}</ins>
          )}{' '}
          {item.discount_gb !== 'B' ? (
            <span>{item.fee_rate}%</span>
          ) : (
            <span>
              {Math.round(((item.supply_price - item.sale_price) / item.supply_price) * 100)}%
            </span>
          )}{' '}
          <ins>{formatNumber(item.sale_price)}</ins> */}
        </p>
        <p className="review">
          <span>리뷰 {item.review_cnt > 0 && formatNumber(item.review_cnt)}</span>
        </p>

        {product && (
          <p className="label_info">
            {item.icon &&
              codes?.map((code, index) => {
                if (item.icon.includes(code.code_cd2)) {
                  return (
                    <picture key={index} style={{ margin: '2px' }}>
                      <source
                        srcSet={`/asset/images/shop/product/p_${code.code_cd2}.jpg`}
                        media="(min-width:768px)"
                      />
                      {/* pc이미지 */}
                      <source
                        srcSet={`/asset/images/shop/product/m_${code.code_cd2}.jpg`}
                        media="(max-width:767px)"
                      />
                      {/* mb이미지 */}
                      <img
                        src={`/asset/images/shop/product/p_${code.code_cd2}.jpg`}
                        alt={code.code_nm2}
                      />
                      {/* pc이미지 */}
                    </picture>
                  );
                }
              })}
          </p>
        )}
      </div>
    </li>
  );
  // return (
  //   <li ref={lastRef}>
  //     <div className="box">
  //       <div className="img_area">
  //         <div className="img js_list_img">
  //           {item[product ? 'file' : 'product_main_list']?.length > 0 ? (
  //             item[product ? 'file' : 'product_main_list'].map((image, index) => (
  //               <Link
  //                 key={index}
  //                 to={`/shop/product/${
  //                   item.group_yn === 'Y' ? 'product_deal_view' : 'product_view'
  //                 }?product_cd=${item.product_cd}`}
  //                 data-val={item.product_cd}
  //                 className="a_or_wish"
  //               >
  //                 <picture>
  //                   {/*[if IE 9]><video style="display: none;"><![endif]*/}
  //                   <source
  //                     srcSet={baseUrl + `/uploads/product/285/${image.file_nm}`}
  //                     media="(min-width:768px)"
  //                   />
  //                   {/* pc이미지 */}
  //                   <source
  //                     srcSet={baseUrl + `/uploads/product/285/${image.file_nm}`}
  //                     media="(max-width:767px)"
  //                   />
  //                   {/* mb이미지 */}
  //                   {/*[if IE 9]></video><![endif]*/}
  //                   <img src={baseUrl + `/uploads/product/285/${image.file_nm}`} alt="" />
  //                   {/* pc이미지 */}
  //                 </picture>
  //               </Link>
  //             ))
  //           ) : (
  //             <picture>
  //               {/*[if IE 9]><video style="display: none;"><![endif]*/}
  //               <source
  //                 srcSet="/asset/images/shop/product/pro_in_img.jpg"
  //                 media="(min-width:768px)"
  //               />
  //               {/* pc이미지 */}
  //               <source
  //                 srcSet="/asset/images/shop/product/pro_in_img.jpg"
  //                 media="(max-width:767px)"
  //               />
  //               {/* mb이미지 */}
  //               {/*[if IE 9]></video><![endif]*/}
  //               <img src="/asset/images/shop/product/pro_in_img.jpg" alt="" loading="lazy" />
  //               {/* pc이미지 */}
  //             </picture>
  //           )}
  //         </div>
  //         <button
  //           type="button"
  //           className={`btn_wish ${item.wish_click_on} wish_${item.product_cd}`}
  //           onClick={() => {
  //             if (product) {
  //               if (cust_seq) {
  //                 likeProduct(item.product_cd, cust_seq);
  //               } else {
  //                 alert('로그인해야 합니다.');
  //                 return navigate('/shop/login/login');
  //               }
  //             }
  //           }}
  //         >
  //           위시리스트 담기
  //         </button>
  //       </div>
  //       <Link
  //         to={`/shop/product/${
  //           item.group_yn === 'Y' ? 'product_deal_view' : 'product_view'
  //         }?product_cd=${item.product_cd}`}
  //         data-val={item.product_cd}
  //       >
  //         <p className="tit">{item.product_nm && parse(item.product_nm)}</p>
  //       </Link>
  //       <p className="price">
  //         {item.supply_price !== item.sale_price ? (
  //           <del>{formatNumber(item.supply_price)}</del>
  //         ) : (
  //           <ins>{formatNumber(item.sale_price)}</ins>
  //         )}{' '}
  //         {item.discount_gb !== 'B' ? (
  //           <span>{item.fee_rate}%</span>
  //         ) : (
  //           <span>
  //             {Math.round(((item.supply_price - item.sale_price) / item.supply_price) * 100)}%
  //           </span>
  //         )}{' '}
  //         <ins>{formatNumber(item.sale_price)}</ins>
  //       </p>
  //       <p className="review">
  //         <span>리뷰 {item.review_cnt > 0 && formatNumber(item.review_cnt)}</span>
  //       </p>

  //       {product && (
  //         <p className="label_info">
  //           {item.icon &&
  //             codes?.map((code, index) => {
  //               if (item.icon.includes(code.code_cd2)) {
  //                 return (
  //                   <picture key={index} style={{ margin: '2px' }}>
  //                     <source
  //                       srcSet={`/asset/images/shop/product/p_${code.code_cd2}.jpg`}
  //                       media="(min-width:768px)"
  //                     />
  //                     {/* pc이미지 */}
  //                     <source
  //                       srcSet={`/asset/images/shop/product/m_${code.code_cd2}.jpg`}
  //                       media="(max-width:767px)"
  //                     />
  //                     {/* mb이미지 */}
  //                     <img
  //                       src={`/asset/images/shop/product/p_${code.code_cd2}.jpg`}
  //                       alt={code.code_nm2}
  //                     />
  //                     {/* pc이미지 */}
  //                   </picture>
  //                 );
  //               }
  //             })}
  //         </p>
  //       )}
  //     </div>
  //   </li>
  // );
};

export default Item;
