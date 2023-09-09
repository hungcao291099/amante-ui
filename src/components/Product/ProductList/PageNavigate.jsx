import { Link } from 'react-router-dom';

const PageNavigate = ({ cateData, category2Cd, category3Cd, parse }) => {
  return (
    <div className="page_navi">
      <Link to="/shop/main/main">홈 {'>'}</Link>
      <Link to={`/shop/product/product_lists?sh_category1_cd=${cateData?.category_cd}`}>
        {cateData?.category_nm && parse(cateData?.category_nm.replace('<br>', ''))}
      </Link>
      <Link
        to={`/shop/product/product_lists?sh_category1_cd=${cateData?.category_cd}&sh_category2_cd=${category2Cd}`}
      >
        {cateData?.category2_nm ? `> ${parse(cateData?.category2_nm.replace('<br>', ''))}` : ''}
      </Link>
      <Link
        to={`/shop/product/product_lists?sh_category1_cd=${cateData?.category_cd}&sh_category2_cd=${category2Cd}&sh_category3_cd=${category3Cd}`}
      >
        {cateData?.category3_nm ? `> ${parse(cateData?.category3_nm.replace('<br>', ''))}` : ''}
      </Link>
    </div>
  );
};

export default PageNavigate;
