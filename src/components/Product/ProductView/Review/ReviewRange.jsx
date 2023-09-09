import { Fragment } from 'react'

const ReviewRange = ({productView}) => {
  return (
    <>
      {productView.avg?.total_avg && productView.review_pt_yn === "Y" && (
        <div className="total_review">
          <strong>{productView.avg.total_avg}</strong>
          <dl>
            {productView.point_code?.map((code, index) => (
              <Fragment key={index}>
                <dt>{code.code_nm2}</dt>
                <dd>
                  <div>
                    <div className="first">{code.bigo}</div>
                    <div className="bar">
                      <span style={{ left: `${productView.avg[`${code.code_cd2}%`]}` }}>
                        {productView.avg[`${code.code_cd2}`]}%
                      </span>
                    </div>
                    <div className="last">{code.bigo2}</div>
                  </div>
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
      )}
    </>
  )
}

export default ReviewRange