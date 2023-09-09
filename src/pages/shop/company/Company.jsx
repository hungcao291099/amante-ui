import { Helmet } from "react-helmet"

const Company = () => {
  return (
    <>
      <Helmet>
        <title>아망떼 ㅣ회사소개</title>
      </Helmet>
      <div className="content company company_page">
        <div className="inner">
          <picture>
            {/*[if IE 9]><video style="display: none;"><![endif]*/}
            <source
              srcSet="/asset/images/shop/company/pc_company.jpg"
              media="(min-width:768px)"
            />
            {/* pc이미지 */}
            <source
              srcSet="/asset/images/shop/company/pc_company.jpg"
              media="(max-width:767px)"
            />
            {/* mb이미지 */}
            {/*[if IE 9]></video><![endif]*/}
            <img src="/asset/images/shop/company/pc_company.jpg" alt="회사소개" />
            {/* pc이미지 */}
          </picture>
        </div>
      </div>
    </>
  )
}

export default Company