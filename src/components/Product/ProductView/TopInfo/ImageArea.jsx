const ImageArea = ({ productView, baseUrl }) => {
  $(document).ready(function () {
    if (commonUI.isMobile) {
      mbSlideEvent();
    } else {
      pcSlideEvent();
      $('.easyzoom').easyZoom();
    }

    $(window).on('resize', function () {
      if ($(window).width() < 767) {
        mbSlideEvent();
      } else {
        pcSlideEvent();
      }
    });
  });

  function pcSlideEvent() {
    $('.w_slide').not('.slick-initialized').slick({
      lazyLoad: 'ondemand',
      centerMode: false,
      variableWidth: true,
      slidesToScroll: 1,
      slidesToShow: 3,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 1500,
      dots: false,
      arrows: true,
    });
    if ($('.prd_info_top>.img_area>.slick-slider').length) {
      $('.main_img').slick('unslick');
    }
    $('.sub_img button').unbind('click');
    $('.sub_img button').on('mouseenter', function () {
      var slideNo = $(this).index();
      $('.main_img .img').eq(slideNo).addClass('active').siblings().removeClass('active');
      $(this).addClass('active').siblings().removeClass('active');
    });

    //리셋 선택시
    $('.resetBtn').on('click', function () {
      $('.main_img .img').eq(0).addClass('active').siblings().removeClass('active');
      $('.sub_img button').eq(0).addClass('active').siblings().removeClass('active');
      reset_img();
    });
  }

  function mbSlideEvent() {
    if ($('.review_widget>.slick-slider').length) {
      $('.w_slide').slick('unslick');
    }
    $('.main_img')
      .not('.slick-initialized')
      .slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: false,
      })
      .on('afterChange', function (event, slick, currentSlide) {
        $('.sub_img button').eq(currentSlide).addClass('active').siblings().removeClass('active');
      });
    $('.sub_img button').unbind('mouseenter');
    $('.sub_img button').on('click', function () {
      var slideNo = $(this).index();
      $('.main_img').slick('slickGoTo', slideNo);
      $(this).addClass('active').siblings().removeClass('active');
    });
    $('.main_img .img>a')
      .off('click')
      .on('click', function (e) {
        e.preventDefault();
        var imgSrc = $(this).find('img').attr('src');
        $('.mb_img_layer').find('.mb_img_view img').attr('src', imgSrc);
        commonUI.layer.open('.mb_img_layer', {
          bg: true,
          alert: true,
        });
      });

    //리셋 선택시
    $('.resetBtn').on('click', function () {
      $('.main_img').slick('slickGoTo', 0);
      $('.colorBtn').eq(0).addClass('on').siblings().removeClass('on');
    });
  }
  return (
    <div className="img_area" id="product_img_div">
      <div className="main_img">
        {productView.file?.map((file, index) => {
          let img;

          if (file.file_nm !== '') {
            img = `${baseUrl}/uploads/product/${file.file_nm}`;
          } else {
            img = '/asset/images/shop/product/pro_in_img.jpg';
          }

          return (
            <div
              key={index}
              className={`img ${index === 0 ? 'active' : ''} easyzoom easyzoom--adjacent is-ready`}
            >
              <a href={img}>
                <picture>
                  {/*[if IE 9]>
                                  <video style="display: none;"><![endif]*/}
                  <source srcSet={img} media="(min-width:768px)" />
                  {/* pc이미지 */}
                  <source srcSet={img} media="(max-width:767px)" />
                  {/* mb이미지 */}
                  {/*[if IE 9]></video><![endif]*/}
                  <img loading="lazy" src={img} alt="" />
                  {/* pc이미지 */}
                </picture>
              </a>
            </div>
          );
        })}
      </div>

      <div className="sub_img">
        {productView.file?.map((file, index) => {
          let img;

          if (file.file_nm !== '') {
            img = `${baseUrl}/uploads/product/${file.file_nm}`;
          } else {
            img = '/asset/images/shop/product/pro_in_img.jpg';
          }

          return (
            <button key={index} className={index === 0 ? 'active' : ''}>
              <picture>
                {/*[if IE 9]>
                                  <video style="display: none;"><![endif]*/}
                <source srcSet={img} media="(min-width:768px)" />
                {/* pc이미지 */}
                <source srcSet={img} media="(max-width:767px)" />
                {/* mb이미지 */}
                {/*[if IE 9]></video><![endif]*/}
                <img loading="lazy" src={img} alt="" />
                {/* pc이미지 */}
              </picture>
            </button>
          );
        })}
      </div>

      <div className="layer_box mb_img_layer" id="mb_img_layer" style={{ padding: 0 }}>
        <div className="layer_outer">
          <div className="layer_inner">
            <div className="layer_con">
              <button type="button" className="layer_close" onClick={() => commonUI.layer.close()}>
                닫기
              </button>
              <p className="mb_img_view">
                <img src="" alt="" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageArea;
