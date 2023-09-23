import parse from 'html-react-parser';
import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet';


import { product } from '@apis/product';
import LoadingBox from '@components/LoadingBox';
import CartLayer from '@components/Product/ProductView/Layer/CartLayer';
import CouponLayer from '@components/Product/ProductView/Layer/CouponLayer';
import GiftLayer from '@components/Product/ProductView/Layer/GiftLayer';
import RestockLayer from '@components/Product/ProductView/Layer/RestockLayer';
import ProductInfoSection from '@components/Product/ProductView/ProductInfoSection';
import ProductRelatedSection from '@components/Product/ProductView/ProductRelatedSection';
import QnaSection from '@components/Product/ProductView/QnaSection';
import TabButtonsSection from '@components/Product/ProductView/TabButtonsSection';
import TabDetailSection from '@components/Product/ProductView/TabDetail/TabDetailSection';
import TabGuideSection from '@components/Product/ProductView/TabGuideSection';
import TabInfoSection from '@components/Product/ProductView/TabInfoSection';
import TabReviewSection from '@components/Product/ProductView/TabReviewSection';
import TopContentSection from '@components/Product/ProductView/TopInfo/TopContentSection';
import { CdnContext } from '@contexts/cdnContext'
import api from '@utils/api/api';
import { formatNumber } from '@utils/functions';
import SuggestProductSection from '@components/Product/ProductView/SuggestProductSection';

const ProductView = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productCd = searchParams.get('product_cd') || null;
  const navigate = useNavigate();
  const [productView, setProductView] = useState({});
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get('member_access_token');
  const userData = token ? jwt_decode(token) : null;
  const cust_seq = userData?.cust_seq || null;
  const user_id = userData?.user_id || null;
  const user_nm = userData?.user_nm || null;
  const phone = userData?.phone || null;
  const email = userData?.email || null;
  const { baseUrl } = useContext(CdnContext);
  const [refreshPage, setRefreshPage] = useState(false);

  // |||||||||||||||||||||||||||||||||||||| FETCH DATA ||||||||||||||||||||||||||||||||||||||
  useEffect(() => {
    if (!productCd) navigate('/shop/main');
  }, [productCd]);

  useEffect(() => {
    const fetchData = async () => {
      const { codeList } = await product();
      setCodes(codeList);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/shop/product/detail?product_cd=${productCd}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductView(data.data);
        if (!data.success) {
          alert('해당 상품은 존재하지 않거나 올바른 경로로 접근하지 않으셨습니다.');
          return navigate(-1);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [productCd, refreshPage]);

  // |||||||||||||||||||||||||||||||||||||||||| JQUERY HANDLER |||||||||||||||||||||||||||||||||||||||||||
  $(document).ready(function () {
    //  ---------------------------------------- VARIABLE -----------------------------------------------
    var tabTop = $('.tab_btn').offset()?.top;

    // ------------------------------------- handle DATA ---------------------------------

    // Open the mobile option window
    $('.mb_show_option_info').on('click', function () {
      $('.prd_info .order_info').addClass('active');
      $('.prd_info .info_area').addClass('active');
      $('.order_btn_area').addClass('active');
      $('.quick').css({
        bottom: '380px',
      });
    });

    // Close the product selection
    $('.info_area .tit_area button').on('click', function () {
      $('.prd_info .order_info').removeClass('active');
      $('.prd_info .info_area').removeClass('active');
      $('.order_btn_area').removeClass('active');
      $('.quick').css({
        bottom: '80px',
      });
    });

    $(document).click(function (e) {
      if ($(e.target).parents('.order_info').length < 1) {
        $('.prd_info .order_info').removeClass('active');
        $('.prd_info .info_area').removeClass('active');
        $('.order_btn_area').removeClass('active');
        $('.quick').css({
          bottom: '80px',
        });
      }
    });

    // -Review Widget Exposure to each type
    $('.review_widget .slide picture img').each(function (index, item) {
      var rvImgWd = $(item).width(),
        rvImgHg = $(item).height();

      if (rvImgWd > rvImgHg) {
        $(this).css({
          height: '100%',
        });
      } else {
        $(this).css({
          width: '100%',
        });
      }
    });

    $('.js_toggle_btn button').on('click', function () {
      $(this).parent().toggleClass('on');
    });

    $('.share_area .open').on('click', function () {
      $('.share_layer').toggleClass('on');
    });

    $('.share_area .close').on('click', function () {
      $('.share_layer').removeClass('on');
    });

    $(window).scroll(function () {
      var windowTop = $(window).scrollTop();
      if (windowTop >= tabTop) {
        $('.tab_btn').addClass('fix');
      } else {
        $('.tab_btn').removeClass('fix');
      }
    });

    $('#w_opt_text').focusout(function () {
      if ($(this).val().trim() === '') {
        alert('작성형 옵션을 작성해주세요.');
        return false;
      }

      w_opt = true;
      var product_info = {};
      product_info.product_cd = productCd;
      product_info.product_nm = productView.product_nm;
      product_info.base_price = productView.sale_price;
      product_info.product_gb = 'P';
      product_info.qty =
        Number(productView.order_mini_quantiry) !== 0 ? productView.order_mini_quantiry : 1;
      if (is_c_option_exist()) {
        product_info.option_yn = 'Y';
        product_info.options = get_form_c_options();
        console.log(product_info.options);
        if (product_info.options.length !== 0) {
          create_opt_box(product_info);
        }
      }
    });

    let oldVal;
		$("#w_opt_text").on("propertychange change keyup paste input", function(){
			var currentVal = $(this).val();
			if(currentVal == oldVal) {
				return;
			}
			oldVal = currentVal;

			$(this).attr("value", currentVal);
			if(currentVal == ""){
				//값이 없을 때
				$(".txt_opt").append(`<label for="w_opt_text" class="tit">${productView.write_title}</label>`);
			}else{
				//값이 있을 때
				$(".txt_opt .tit").remove();
			}
		});


    // -Add additional product information box when selecting additional products (free gifts)
    $('.prd_info .order_info .add_item .add_gift_product').on('click', function () {
      const product_info = {};
      product_info.product_cd = $(this).data('product-cd');
      product_info.product_nm = $(this).data('product-nm');
      product_info.option_yn = 'N';
      product_info.base_price = $(this).data('base-price');
      product_info.product_gb = $(this).data('product-gb');
      product_info.qty =
        Number(productView.order_mini_quantiry) !== 0 ? productView.order_mini_quantiry : 1;
      create_opt_box(product_info);
    });

    // -------------------------------------- ACTIVE image -------------------------------------------------
    $('.sub_img button').unbind('click');
    $('.sub_img button').on('mouseenter', function () {
      const slideNo = $(this).index();
      $('.main_img .img').eq(slideNo).addClass('active').siblings().removeClass('active');
      $(this).addClass('active').siblings().removeClass('active');
    });

    // ------------------------------ open ADDITION product list -----------------------------
    $('.add_item_list_show').on('click', function () {
      $(this).toggleClass('on');
    });

  });

  async function like_con(sort, no, gubun) {
    try {
      await api({
        url: '/shop/event/insert/like',
        method: 'POST',
        data: {
          sort,
          no,
          gubun,
          user_id,
          cust_seq,
        },
      });
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
      console.log(error);
    }
  }

  async function del_like(sort, no) {
    try {
      await api({
        url: '/shop/event/delete/like',
        method: 'DELETE',
        data: {
          sort,
          no,
          cust_seq,
        },
      });
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
      console.log(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>{`아망떼 ㅣ${productView?.product_nm ? productView?.product_nm : ''}`}</title>
      </Helmet>
      <div className="content product product_view_page review_form">
        {loading ? (
          <LoadingBox />
        ) : (
          <div className="wrap">
            {/* ====================================== TOP section ======================================================== */}
            <TopContentSection
              productView={productView}
              baseUrl={baseUrl}
              codes={codes}
              formatNumber={formatNumber}
              cust_seq={cust_seq}
              navigate={navigate}
              api={api}
              token={token}
            />

            {/* ===================================  SLIDE product relation section =============================================== */}
            <ProductRelatedSection productView={productView} baseUrl={baseUrl} codes={codes} />

            {/* ================================== SUGGESTED product section ================================================= */}
            <SuggestProductSection />

            {/* ================================== TAB controls section ========================================================== */}
            <TabButtonsSection productView={productView} formatNumber={formatNumber} />

            {/* ================================== TAB detail section ===========================================================  */}
            <TabDetailSection
              productView={productView}
              baseUrl={baseUrl}
              navigate={navigate}
              like_con={like_con}
              del_like={del_like}
              parse={parse}
            />

            {/* ================================= product INFO section ======================================================== */}
            <ProductInfoSection productView={productView} />

            {/* ===================================== TAB info section =========================================================*/}
            <TabInfoSection productView={productView} parse={parse} />

            {/* =================================== TAB review section ===========================================================*/}
            <TabReviewSection
              productView={productView}
              formatNumber={formatNumber}
              cust_seq={cust_seq}
              user_id={user_id}
              user_nm={user_nm}
              like_con={like_con}
              del_like={del_like}
              baseUrl={baseUrl}
              api={api}
              productCd={productCd}
              navigate={navigate}
            />

            {/* ================================= TAB qna section ============================================================= */}
            <QnaSection
              productView={productView}
              cust_seq={cust_seq}
              productCd={productCd}
              api={api}
            />

            {/* ================================ TAB guide section ============================================================= */}
            <TabGuideSection productView={productView} parse={parse} />
          </div>
        )}
      </div>

      {/* ########################### LAYER ################################# */}
      {/* coupon */}
      <CouponLayer
        productView={productView}
        baseUrl={baseUrl}
        formatNumber={formatNumber}
        api={api}
        cust_seq={cust_seq}
        user_id={user_id}
        setRefreshPage={setRefreshPage}
      />

      {/* restock */}
      <RestockLayer
        productView={productView}
        baseUrl={baseUrl}
        formatNumber={formatNumber}
        cust_seq={cust_seq}
        navigate={navigate}
        api={api}
        phone={phone}
        user_id={user_id}
        user_nm={user_nm}
        email={email}
      />

      {/* gift */}
      <GiftLayer />

      {/* cart */}
      <CartLayer navigate={navigate} />
    </>
  );
};

export default ProductView;
