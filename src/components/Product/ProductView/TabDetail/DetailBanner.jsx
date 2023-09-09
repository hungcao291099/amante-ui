
const DetailBanner = ({productView, baseUrl}) => {
  return (
    <>
      {productView.detail_banner?.length > 0 && (
          <div className="keyvisual_area">
            {productView.detail_banner.map((banner, index) => (
              <div className="slide" key={index}>
                <a href={banner.link} target={banner.link_gb === 'out' ? '_blank' : '_self'}>
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
                      <img
                        loading="lazy"
                        src={`${baseUrl}/uploads/banner/${banner.file_nm1}`}
                        alt=""
                      />
                      {/* pc이미지 */}
                    </picture>
                  </div>
                  <div className="txt">
                    <div className="t">
                      <div className="tc">
                        <p className="sub_tit">{banner.content_text1}</p>
                        <p className="main_tit">{banner.content_text2}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
    </>
  )
}

export default DetailBanner