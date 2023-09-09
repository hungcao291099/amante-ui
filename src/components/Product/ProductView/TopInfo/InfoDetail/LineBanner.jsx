

const LineBanner = ({productView, baseUrl}) => {
  return (
    <>
      {productView.line_banner?.length > 0 && (
        <div
          style={{
            cursor:
              productView.line_banner[0]?.link !== "" ? "pointer" : "",
          }}
          className="line_banner"
          onClick={() =>
            productView.line_banner[0]?.link !== "" &&
            (productView.line_banner[0]?.link_gb === "in"
              ? (window.location.href = `${productView.line_banner[0]?.link}`)
              : window.open(`${productView.line_banner[0]?.link}`))
          }
        >
          <picture>
            {/*[if IE 9]>
                    <video style="display: none;"><![endif]*/}
            <source
              srcSet={`${baseUrl}/uploads/banner/${productView.line_banner[0]?.file_nm1}`}
              media="(min-width:768px)"
            />
            {/* pc이미지 */}
            <source
              srcSet={`${baseUrl}/uploads/banner/${productView.line_banner[0]?.file_nm2}`}
              media="(max-width:767px)"
            />
            {/* mb이미지 */}
            {/*[if IE 9]></video><![endif]*/}
            <img
              loading="lazy"
              src={`${baseUrl}/uploads/banner/${productView.line}`}
              alt=""
            />
            {/* pc이미지 */}
          </picture>
        </div>
      )}
    </>
  )
}

export default LineBanner