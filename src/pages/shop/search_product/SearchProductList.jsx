import { product } from '@apis/product';
import Item from '@components/Product/Item';
import api from '@utils/api/api';
import { formatNumber } from '@utils/functions';
import jwt_decode from 'jwt-decode';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'swiper/css';
import Cookies from 'universal-cookie';
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';
import SearchCategory from '../../../components/Product/ProductList/SearchCategory';

const SearchProductList = () => {
  const [products, setProducts] = useState({});
  const [sorts, setSorts] = useState([]);
  const [orderBy, setOrderBy] = useState('A');
  const [inStock, setInStock] = useState(false);
  const [codes, setCodes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [rowCount, setRowCount] = useState(10);
  const [categoryTotal, setCategoryTotal] = useState([]);
  const observer = useRef();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const cookies = new Cookies();
  const token = cookies.get('member_access_token');
  const userData = token ? jwt_decode(token) : null;
  const cust_seq = userData?.cust_seq || null;
  const shCate1Cd = Number(urlParams.get('sh_category1_cd')) || '';
  const shCate2Cd = Number(urlParams.get('sh_category2_cd')) || '';
  const keyword = urlParams.get('keyword') || '';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { sortList, codeList } = await product();
      setSorts(sortList);
      setCodes(codeList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/shop/category/total`, {
          params: {
            keyword,
            sh_category1_cd: shCate1Cd,
            sh_category2_cd: shCate2Cd,
          },
        });
        setCategoryTotal(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/shop/product/list`, {
          params: {
            pageCnt: rowCount,
            orderBy,
            inStock,
            keyword,
            sh_category1_cd: shCate1Cd,
            sh_category2_cd: shCate2Cd,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(data);
        setRowCount(Number(data.pageCnt));
        setHasMore(data.data.length > 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchProduct();
  }, [rowCount, orderBy, inStock, keyword, shCate1Cd, shCate2Cd]);

  const getSortValue = (e) => {
    setOrderBy(e.target.value);
  };

  const lastRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setRowCount((prev) => prev + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  

  return (
    <>
      <Helmet>
        <title>아망떼 ㅣ검색</title>
      </Helmet>
      <div className="content search_product search_product_lists_page product_lists_page">
        <div className="wrap">
          <div className="search_tit">
            <span>{keyword}</span> 검색 결과
          </div>

          <SearchCategory
            categoryTotal={categoryTotal}
            keyword={keyword}
            shCate1Cd={shCate1Cd}
            shCate2Cd={shCate2Cd}
            parse={parse}
          />

          <div className="prd_top">
            <p className="txt">
              총 <em id="total_count_text">{products.total ? formatNumber(products.total) : 0}</em>
              개
            </p>
            <div className="top_r">
              <div className="design_checkbox">
                <input
                  onChange={() => setInStock((prev) => !prev)}
                  type="checkbox"
                  id="all_Y"
                  value="Y"
                />
                <label htmlFor="all_Y">재고있음</label>
              </div>
              <select onChange={getSortValue} name="js_select" id="js_select" className="pd_select">
                {sorts?.map((sort, index) => (
                  <option key={index} value={sort.bigo}>
                    {sort.code_nm2}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="prd_list">
            <ul id="product_ul">
              {products.data?.length > 0 ? (
                products.data.map((product, index) =>
                  index + 1 === products.data.length ? (
                    <Item
                      key={index}
                      item={product}
                      product={true}
                      codes={codes}
                      lastRef={lastRef}
                      cust_seq={cust_seq}
                      navigate={navigate}
                    />
                  ) : (
                    <Item
                      key={index}
                      item={product}
                      product={true}
                      codes={codes}
                      cust_seq={cust_seq}
                      navigate={navigate}
                    />
                  )
                )
              ) : (
                <li className="nodata">등록된 상품이 없습니다.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProductList;
