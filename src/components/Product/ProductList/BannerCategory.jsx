import parse from 'html-react-parser';
import Slider from 'react-slick';

const BannerCategory = ({ baseUrl, cateBanner }) => {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div className="prd_homde_keyvisual">
      <Slider className="slider" {...settings}>
        {cateBanner?.map((banner, index) => (
          <a
            className="slick-slide"
            key={index}
            href={banner.link}
            target={banner.link_gb === 'out' ? '_blank' : ''}
          >
            <div className="wrap">
              <div className="img">
                <picture>
                  {/*[if IE 9]><video style="display: none;"><![endif]*/}
                  <source
                    srcSet={`${baseUrl}/uploads/banner/${banner.file_nm1}`}
                    media="(min-width:768px)"
                  />
                  {/* pc이미지 */}
                  <source
                    srcSet={`${baseUrl}/uploads/banner/${banner.file_nm2}`}
                    media="(max-width:767px)"
                  />
                  {/* mb이미지 */}
                  {/*[if IE 9]></video><![endif]*/}
                  <img src={`${baseUrl}/uploads/banner/${banner.file_nm1}`} alt="" />
                  {/* pc이미지 */}
                </picture>
              </div>

              <div className="txt">
                <div className="t">
                  <div className="tc">
                    <p
                      className="sub_tit"
                      style={{
                        color: banner.text1_rgb.includes('#')
                          ? banner.text1_rgb
                          : `#${banner.text1_rgb}`,
                      }}
                    >
                      {parse(banner.content_text1)}
                    </p>
                    <p
                      className="main_tit"
                      style={{
                        color: banner.text2_rgb.includes('#')
                          ? banner.text2_rgb
                          : `#${banner.text2_rgb}`,
                      }}
                    >
                      {parse(banner.content_text2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCategory;
