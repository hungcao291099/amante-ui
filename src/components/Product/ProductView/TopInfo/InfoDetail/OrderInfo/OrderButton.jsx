import { likeProduct } from '@utils/functions';

const OrderButton = ({ productView, navigate, cust_seq, productCheck }) => {
  return (
    <div className="btn_area order_btn_area">
      <button
        className={`btn_txt btn_wish ${productView.wish_click_on} wish_${productView.product_cd}`}
        onClick={() => {
          if (cust_seq) {
            likeProduct(productView.product_cd, cust_seq);
          } else {
            alert('로그인이 필요합니다.');
            return navigate(`/shop/login/login`);
          }
        }}
      >
        <span>찜</span>
      </button>

      <button type="button" className="btn_txt pc_hidden btn_cart mb_show_option_info">
        <span>장바구니</span>
      </button>
      <button type="button" className="btn_txt pc_hidden btn_buy mb_show_option_info">
        <span>구매하기</span>
      </button>
      <button type="button" className="btn_txt pc_hidden btn_gift mb_show_option_info">
        <span>선물하기</span>
      </button>
      <button
        type="button"
        className="btn_txt pc_visible btn_cart"
        onClick={() => productCheck(productView.product_cd, 'F')}
      >
        <span>장바구니</span>
      </button>
      <button
        type="button"
        className="btn_txt pc_visible btn_buy"
        onClick={() => {
          if (cust_seq) {
            productCheck(productView.product_cd, 'T');
          } else {
            alert('로그인이 필요합니다.');
            navigate(`/shop/login/login`);
          }
        }}
      >
        <span>구매하기</span>
      </button>

      <button
        type="button"
        className="btn_txt pc_visible btn_gift"
        onClick={() => {
          if (cust_seq) {
            productCheck(productView.product_cd, 'G');
          } else {
            alert('로그인이 필요합니다.');
            navigate(`/shop/login/login`);
          }
        }}
      >
        <span>선물하기</span>
      </button>
    </div>
  );
};

export default OrderButton;
