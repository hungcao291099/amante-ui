import { product, productCate } from '@apis/product';
import BannerCategory from '@components/Product/ProductList/BannerCategory';
import BestList from '@components/Product/ProductList/BestList';
import PageNavigate from '@components/Product/ProductList/PageNavigate';
import Item from '@components/Product/Item';
import { CdnContext } from '@contexts/cdnContext';
import api from '@utils/api/api';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Filter from './Filter';
import jwt_decode from 'jwt-decode';
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';

const ProductList = () => {
  const [products, setProducts] = useState({});
  const [sorts, setSorts] = useState([]);
  const [orderBy, setOrderBy] = useState('A');
  const [inStock, setInStock] = useState(false);
  const [codes, setCodes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [rowCount, setRowCount] = useState(10);
  const [cateData, setCateData] = useState({});
  const [cateBanner, setCateBanner] = useState([]);
  const observer = useRef();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { baseUrl } = useContext(CdnContext);
  const category1Cd = Number(urlParams.get('sh_category1_cd')) || '';
  const category2Cd = Number(urlParams.get('sh_category2_cd')) || '';
  const category3Cd = Number(urlParams.get('sh_category3_cd')) || '';
  const { cate, cate2, cate3, bests } = cateData;
  const cookies = new Cookies();
  const token = cookies.get('member_access_token');
  const userData = token ? jwt_decode(token) : null;
  const cust_seq = userData?.cust_seq || null;
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
      const data = await productCate(category1Cd, category2Cd, category3Cd, token);
      setCateData(data.cateData);
      setCateBanner(data.cateBanner);
    };

    fetchData();
  }, [category1Cd, category2Cd, category3Cd]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/shop/product/list`, {
          params: {
            pageCnt: rowCount,
            orderBy,
            inStock,
            sh_category1_cd: category1Cd,
            sh_category2_cd: category2Cd,
            sh_category3_cd: category3Cd,
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
  }, [rowCount, orderBy, inStock, category1Cd, category2Cd, category3Cd]);

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
        <title>
          {`아망떼 ㅣ
          ${
            cate?.category3_nm
              ? cate.category3_nm.replace(/<[^>]+>/g, '')
              : cate?.category2_nm
              ? cate.category2_nm.replace(/<[^>]+>/g, '')
              : cate?.category_nm
              ? cate?.category_nm.replace(/<[^>]+>/g, '')
              : ''
          }`}
        </title>
      </Helmet>
      <div
        className={`content product product_lists_page ${
          category1Cd === 3 && category2Cd === ''
            ? 'kids_page'
            : category1Cd === 13 && category2Cd === ''
            ? 'disney_page'
            : ''
        }`}
      >
        <BannerCategory baseUrl={baseUrl} cateBanner={cateBanner} />

        <PageNavigate
          cateData={cate}
          category2Cd={category2Cd}
          category3Cd={category3Cd}
          parse={parse}
        />

        <div className="mb_prd_lnb">
          {cate?.category3_nm
            ? parse(cate.category3_nm.replace('<br>', ''))
            : cate?.category2_nm
            ? parse(cate.category2_nm.replace('<br>', ''))
            : cate?.category_nm && parse(cate.category_nm.replace('<br>', ''))}
        </div>

        <div className="wrap">
          <div className="pc_prd_lnb">
            {cate?.category3_nm
              ? parse(cate.category3_nm.replace('<br>', ''))
              : cate?.category2_nm
              ? parse(cate.category2_nm.replace('<br>', ''))
              : cate?.category_nm && parse(cate.category_nm.replace('<br>', ''))}
          </div>

          {category1Cd !== '' && category2Cd === '' && cate2?.length > 0 && (
            <ul
              className={`prd_depth1_btn ${
                category1Cd === 1 || category1Cd === 3
                  ? 'point_depth'
                  : category1Cd === 5 && 'point_depth_02'
              }`}
            >
              {cate2?.map((cate, index) => (
                <li key={index}>
                  <Link
                    to={`/shop/product/product_lists?sh_category1_cd=${category1Cd}&sh_category2_cd=${cate.category_cd}`}
                  >
                    {cate?.category_nm && parse(cate.category_nm.replace('<br>', ''))}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {category2Cd !== '' && cate3?.length > 0 && (
            <ul className="prd_depth1_btn">
              {cate3?.map((cate, index) => (
                <li key={index} className={category3Cd === cate.category_cd ? 'on' : ''}>
                  <Link
                    to={`/shop/product/product_lists?sh_category1_cd=${category1Cd}&sh_category2_cd=${category2Cd}&sh_category3_cd=${cate.category_cd}`}
                  >
                    {cate?.category_nm && parse(cate.category_nm.replace('<br>', ''))}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <BestList bests={bests} Item={Item} />

          <Filter
            products={products}
            setInStock={setInStock}
            sorts={sorts}
            getSortValue={getSortValue}
          />

          <div className="prd_list">
            <ul id="product_ul">
              {products.data?.length > 0 ? (
                products.data.map((product, index) =>
                  index + 1 === products.data.length && products.data.length !== products.total ? (
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

export default ProductList;
