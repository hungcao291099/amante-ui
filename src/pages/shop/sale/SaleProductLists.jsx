import { getGeneralData, getProduct } from "@apis/SaleProductListApi"
import { useState, useEffect, useRef, useCallback, useContext } from "react"
import Slider from "react-slick"
import { formatNumber } from "@utils/functions"
import { CdnContext } from "@contexts/cdnContext"
import { wish, removeWish } from "@apis/wishApi"
import DOMPurify from "dompurify"
import { Link } from "react-router-dom"

export default () => {
    const [generalData, setGeneralData] = useState(undefined)
    const [data, setData] = useState(undefined)
    const [hasMore, setHasMore] = useState(undefined)
    const [seletedMode, setSelectedMode] = useState("all")
    const [params, setParams] = useState(undefined)
    const [page, setPage] = useState(1);
    const [width, setWidth] = useState(undefined);
    const { baseUrl } = useContext(CdnContext)
    const observer = useRef()

    const fetchGeneralData = async () => {
        const result = await getGeneralData()
        setGeneralData(result)
        return () => { }
    }

    const fetchProductData = async (mode, search_option) => {
        const response = await getProduct(mode, search_option)
        setHasMore(response.page <= Math.ceil(response.total / response.pageCnt))
        if (response.page <= Math.ceil(response.total / response.pageCnt)) {
            if (response.page <= 1) {
                setData(response.data)
            } else {
                setData((prev) => { return [...prev, ...response.data] })
            }
        }
        return () => { }
    }

    useEffect(() => {
        fetchGeneralData()

        const handleResize = () => {
            const width = document.documentElement.clientWidth;
            setWidth(width);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    useEffect(() => {
        setParams({ category1_cd: seletedMode == "all" ? "" : seletedMode })
        setPage(1)
        setData(undefined)
    }, [seletedMode])

    useEffect(() => {
        fetchProductData(seletedMode, { ...params, page })
    }, [params, page])

    const pc_slide1 = {
        slidesToScroll: 1,
        infinite: true,
        variableWidth: true,
        centerMode: false,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        className: "pc_slide"
    }

    const handleError = (e) => {
        e.target.style.display = "none"
    }

    const lastRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1)
                }
            })
            if (node) observer.current.observe(node)
        }, [hasMore]
    )


    const handleLike = async (product_cd, e) => {
        if (e.target.classList.contains("on")) {
            const result = await removeWish(product_cd)
            if (result.success) {
                e.target.classList.remove("on")
            }
        } else {
            const result = await wish(product_cd)
            if (result.success) {
                e.target.classList.add("on")
            }
        }
    }

    return (
        <>
            {generalData ? (
                <div className="content product box_area hotdel_area product_lists_page sale_lists_page">
                    <div className="wrap">
                        <div className="must_buy_this">
                            <h3>{generalData.hotdeal && generalData.hotdeal.name}</h3>
                            <div className="prd_list">
                                {width > 786 ? (
                                    <Slider {...pc_slide1}>
                                        {generalData.hotdeal && generalData.hotdeal.products.map((deal, idx) => {
                                            const rd = []
                                            const startdate = new Date(deal.display_s_date)
                                            const enddate = new Date(deal.display_e_date)
                                            const timediff = enddate - startdate
                                            // console.log(enddate, startdate, timediff)
                                            const day = Math.floor(timediff / (60 * 60 * 24 * 1000))
                                            const hour = Math.floor((timediff - (day * 60 * 60 * 24 * 1000)) / (60 * 60 * 1000))
                                            const minute = Math.floor((timediff - (day * 60 * 60 * 24 * 1000) - (hour * 60 * 60 * 1000)) / (60 * 1000))
                                            if (startdate <= new Date(Date.now())) {
                                                rd.push(
                                                    <li key={idx}>
                                                        <Link to={`/shop/product/product_view?product_cd=${deal.product_cd}`} className="box">
                                                            <p className="dday"><span>종료</span>까지 {day <= 0 ? `${hour}시간 ${minute}분 ` : `${day}일 ${hour}시간 ${minute}분 `}</p>
                                                            <div className="img">
                                                                <picture>
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} media="(min-width:768px)" />
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} media="(max-width:767px)" />
                                                                    <img src={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} alt="" />
                                                                </picture>
                                                            </div>
                                                            <p className="price">
                                                                <del>
                                                                    {formatNumber(deal.supply_price)}원
                                                                </del>
                                                                <span className="ms-1">
                                                                    {deal.discount_gb !== "B" ?
                                                                        `${deal.fee_rate}%`
                                                                        : `${Math.round(((deal.supply_price - deal.sale_price) / deal.supply_price) * 100)}%`}
                                                                </span>
                                                                <ins>
                                                                    {formatNumber(deal.sale_price)}원
                                                                </ins>
                                                            </p>
                                                            <p className="tit" dangerouslySetInnerHTML={{
                                                                __html: DOMPurify.sanitize(deal.product_nm, {
                                                                    FORBID_TAGS: ['br']
                                                                })
                                                            }}></p>
                                                        </Link>
                                                    </li>
                                                )
                                            } else {
                                                const s_date = deal.display_s_date.substring(5, 10)
                                                const display_s_date = deal.display_s_date.substring(0, 10)
                                                const yoil = ["일", "월", "화", "수", "목", "금", "토"]
                                                let result
                                                const hour = new Date(deal.display_s_date).getHours();
                                                const minute = new Date(deal.display_s_date).getMinutes();
                                                if (hour > 12) {
                                                    let modifiedHour = hour - 12;
                                                    if (modifiedHour.toString().length === 1) {
                                                        modifiedHour = "0" + modifiedHour;
                                                    }
                                                    result = `오후 ${modifiedHour}:${minute}`;
                                                } else {
                                                    result = `오전 ${hour}:${minute}`;
                                                }

                                                rd.push(
                                                    <li key={idx} className="coming_soon">
                                                        <Link to={`/shop/product/product_view?product_cd=${deal.product_cd}`} className="box">
                                                            <p className="dday">
                                                                {s_date.replace(/-/g, '/')} ({yoil[new Date(display_s_date).getDay()]}) {result} 오픈
                                                            </p>
                                                            <div className="img">
                                                                <picture>
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} media="(min-width:768px)" />
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} media="(max-width:767px)" />
                                                                    <img src={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} alt="" />
                                                                </picture>
                                                            </div>
                                                            <p className="price">
                                                                <span>{deal.fee_rate}%</span>
                                                                <ins>{formatNumber(deal.sale_price)}원</ins>
                                                            </p>
                                                            <p className="tit" dangerouslySetInnerHTML={{
                                                                __html: DOMPurify.sanitize(deal.product_nm, {
                                                                    FORBID_TAGS: ['br']
                                                                })
                                                            }}></p>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                            return rd
                                        })}
                                    </Slider>
                                ) : (
                                    <div className="pc_slide d-flex gap-2">
                                        {generalData.hotdeal && generalData.hotdeal.products.map((deal, idx) => {
                                            const rd = []
                                            const startdate = new Date(deal.display_s_date)
                                            const enddate = new Date(deal.display_e_date)
                                            const timediff = enddate - startdate
                                            // console.log(enddate, startdate, timediff)
                                            const day = Math.floor(timediff / (60 * 60 * 24 * 1000))
                                            const hour = Math.floor((timediff - (day * 60 * 60 * 24 * 1000)) / (60 * 60 * 1000))
                                            const minute = Math.floor((timediff - (day * 60 * 60 * 24 * 1000) - (hour * 60 * 60 * 1000)) / (60 * 1000))
                                            if (startdate <= new Date(Date.now())) {
                                                rd.push(
                                                    <li key={idx}>
                                                        <Link to={`/shop/product/product_view?product_cd=${deal.product_cd}`} className="box">
                                                            <p className="dday"><span>종료</span>까지 {day <= 0 ? `${hour}시간 ${minute}분 ` : `${day}일 ${hour}시간 ${minute}분 `}</p>
                                                            <div className="img">
                                                                <picture>
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} media="(min-width:768px)" />
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} media="(max-width:767px)" />
                                                                    <img src={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} alt="" />
                                                                </picture>
                                                            </div>
                                                            <p className="price">
                                                                <del>
                                                                    {formatNumber(deal.supply_price)}원
                                                                </del>
                                                                <span className="ms-1">
                                                                    {deal.discount_gb !== "B" ?
                                                                        `${deal.fee_rate}%`
                                                                        : `${Math.round(((deal.supply_price - deal.sale_price) / deal.supply_price) * 100)}%`}
                                                                </span>
                                                                <ins>
                                                                    {formatNumber(deal.sale_price)}원
                                                                </ins>
                                                            </p>
                                                            <p className="tit" dangerouslySetInnerHTML={{
                                                                __html: DOMPurify.sanitize(deal.product_nm, {
                                                                    FORBID_TAGS: ['br']
                                                                })
                                                            }}></p>
                                                        </Link>
                                                    </li>
                                                )
                                            } else {
                                                const s_date = deal.display_s_date.substring(5, 10)
                                                const display_s_date = deal.display_s_date.substring(0, 10)
                                                const yoil = ["일", "월", "화", "수", "목", "금", "토"]
                                                let result
                                                const hour = new Date(deal.display_s_date).getHours();
                                                const minute = new Date(deal.display_s_date).getMinutes();
                                                if (hour > 12) {
                                                    let modifiedHour = hour - 12;
                                                    if (modifiedHour.toString().length === 1) {
                                                        modifiedHour = "0" + modifiedHour;
                                                    }
                                                    result = `오후 ${modifiedHour}:${minute}`;
                                                } else {
                                                    result = `오전 ${hour}:${minute}`;
                                                }

                                                rd.push(
                                                    <li key={idx} className="coming_soon">
                                                        <Link to={`/shop/product/product_view?product_cd=${deal.product_cd}`} className="box">
                                                            <p className="dday">
                                                                {s_date.replace(/-/g, '/')} ({yoil[new Date(display_s_date).getDay()]}) {result} 오픈
                                                            </p>
                                                            <div className="img">
                                                                <picture>
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} media="(min-width:768px)" />
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} media="(max-width:767px)" />
                                                                    <img src={`${baseUrl}/uploads/product/285/${deal.product_main_img}`} alt="" />
                                                                </picture>
                                                            </div>
                                                            <p className="price">
                                                                <span>{deal.fee_rate}%</span>
                                                                <ins>{formatNumber(deal.sale_price)}</ins>
                                                            </p>
                                                            <p className="tit" dangerouslySetInnerHTML={{
                                                                __html: DOMPurify.sanitize(deal.product_nm, {
                                                                    FORBID_TAGS: ['br']
                                                                })
                                                            }}></p>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                            return rd
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        <ul className="round_sub_tab">
                            {generalData.category && (
                                <li className={`cate_on ${seletedMode == "all" ? "on" : ""}`} id="cate_0">
                                    <a href="#" onClick={(e) => {
                                        setSelectedMode("all")
                                        e.preventDefault()
                                    }}>전체</a>
                                </li>
                            )}
                            {generalData.category && generalData.category.map((cate, idx) => {
                                if (cate.cate_count) {
                                    return (
                                        <li key={idx} className={`cate_on ${seletedMode == cate.category_cd ? "on" : ""}`} id={`cate_${cate.category_cd}`}>
                                            <a href="#" onClick={(e) => {
                                                setSelectedMode(cate.category_cd)
                                                e.preventDefault()
                                            }}
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(`${cate.category_nm} (${cate.cate_count})`, {
                                                        FORBID_TAGS: ['br']
                                                    })
                                                }}
                                            ></a>
                                        </li>
                                    )
                                }
                            })}
                        </ul>

                        <div className="prd_list">
                            <ul id="top_product_ul">
                                {data && data.map((el, idx) => {
                                    if (idx === data.length - 1) {
                                        return (
                                            <li key={idx} ref={lastRef} >
                                                <div className="box">
                                                    <div className="img_area a_or_wish" data-val={el.product_cd} data-group={el.group_yn}>
                                                        <div className="img js_list_img">
                                                            {el.product_main_list && el.product_main_list.map((product, idx) => (
                                                                <Link 
                                                                to={`/shop/product/product_view?product_cd=${el.product_cd}`}
                                                                key={product.product_cd} data-val={product.product_cd} className="a_or_wish" data-group="<?=$top_row['group_yn'] ?>">
                                                                    <picture>
                                                                        <source srcSet={`${baseUrl}/uploads/product/285/${product.file_nm}`} media="(min-width:768px)" />
                                                                        <source srcSet={`${baseUrl}/uploads/product/285/${product.file_nm}`} media="(min-width:767px)" />
                                                                        <img src={`${baseUrl}/uploads/product/285/${product.file_nm}`} alt="" />
                                                                    </picture>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                        <button type="button" onClick={(e) => handleLike(el.product_cd, e)} className={`btn_wish ${el.wish_click_on ? "on" : ""}`}>위시리스트 담기</button>
                                                    </div>
                                                    <Link to={`/shop/product/product_view?product_cd=${el.product_cd}`} data-val={el.product_cd}>
                                                        <p className="tit" dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(el.product_nm, {
                                                                FORBID_TAGS: ['br']
                                                            })
                                                        }}></p>
                                                    </Link>
                                                    <span className={`price ${el.product_state == "4" ? "sold_out" : ""}`}>
                                                        {el.supply_price != el.sale_price ? (
                                                            <>
                                                                <del>
                                                                    {formatNumber(el.supply_price)}원
                                                                </del>
                                                                <span className="ms-1">
                                                                    {el.discount_gb !== "B" ?
                                                                        `${el.fee_rate}%`
                                                                        : `${Math.round(((el.supply_price - el.sale_price) / el.supply_price) * 100)}%`}
                                                                </span>
                                                                <ins>
                                                                    {formatNumber(el.sale_price)}원
                                                                </ins>
                                                            </>
                                                        ) : (
                                                            <ins>{formatNumber(el.sale_price)}원</ins>
                                                        )}
                                                        {el.product_state == '4' && (
                                                            <picture>
                                                                <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(min-width:768px)" />
                                                                <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(max-width:767px)" />
                                                                <img src="/asset/images/shop/product/p_2106.jpg " alt="재입고 알림신청" />
                                                            </picture>
                                                        )}
                                                    </span>
                                                    <p className="review">
                                                        {el.review_cnt > 0 ? (
                                                            <>{el.point}</>
                                                        ) : ""}
                                                        <span> 리뷰 {formatNumber(el.review_cnt)}</span>
                                                    </p>
                                                    <p className="label_info">
                                                        {generalData.icon_list && el.icon && generalData.icon_list.map((icon, idx) => {
                                                            if (el.icon.indexOf(icon.code_cd2) >= 0) {
                                                                return (
                                                                    <picture key={idx}>
                                                                        <source srcSet={`/asset/images/shop/product/p_${icon.code_cd2}.jpg`} media="(min-width:768px)" />
                                                                        <source srcSet={`/asset/images/shop/product/m_${icon.code_cd2}.jpg`} media="(max-width:767px)" />
                                                                        <img src={`/asset/images/shop/product/p_${icon.code_cd2}.jpg`} onError={handleError} alt={icon.code_nm2} />
                                                                    </picture>
                                                                )
                                                            }
                                                        })}
                                                    </p>
                                                </div>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li key={idx}>
                                                <div className="box">
                                                    <div className="img_area a_or_wish" data-val={el.product_cd} data-group={el.group_yn}>
                                                        <div className="img js_list_img">
                                                            {el.product_main_list && el.product_main_list.map((product, idx) => (
                                                                <Link 
                                                                to={`/shop/product/product_view?product_cd=${el.product_cd}`}
                                                                key={product.product_cd} data-val={product.product_cd} className="a_or_wish" data-group="<?=$top_row['group_yn'] ?>">
                                                                    <picture>
                                                                        <source srcSet={`${baseUrl}/uploads/product/285/${product.file_nm}`} media="(min-width:768px)" />
                                                                        <source srcSet={`${baseUrl}/uploads/product/285/${product.file_nm}`} media="(min-width:767px)" />
                                                                        <img src={`${baseUrl}/uploads/product/285/${product.file_nm}`} alt="" />
                                                                    </picture>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                        <button type="button" onClick={(e) => handleLike(el.product_cd, e)} className={`btn_wish ${el.wish_click_on ? "on" : ""}`}>위시리스트 담기</button>
                                                    </div>
                                                    <Link to={`/shop/product/product_view?product_cd=${el.product_cd}`} data-val={el.product_cd}>
                                                        <p className="tit" dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(el.product_nm, {
                                                                FORBID_TAGS: ['br']
                                                            })
                                                        }}></p>
                                                    </Link>
                                                    <span className={`price ${el.product_state == "4" ? "sold_out" : ""}`}>
                                                        {el.supply_price != el.sale_price ? (
                                                            <>
                                                                <del>
                                                                    {formatNumber(el.supply_price)}원
                                                                </del>
                                                                <span className="ms-1">
                                                                    {el.discount_gb !== "B" ?
                                                                        `${el.fee_rate}%`
                                                                        : `${Math.round(((el.supply_price - el.sale_price) / el.supply_price) * 100)}%`}
                                                                </span>
                                                                <ins>
                                                                    {formatNumber(el.sale_price)}원
                                                                </ins>
                                                            </>
                                                        ) : (
                                                            <ins>{formatNumber(el.sale_price)}원</ins>
                                                        )}
                                                        {el.product_state == '4' && (
                                                            <picture>
                                                                <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(min-width:768px)" />
                                                                <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(max-width:767px)" />
                                                                <img src="/asset/images/shop/product/p_2106.jpg " alt="재입고 알림신청" />
                                                            </picture>
                                                        )}
                                                    </span>
                                                    <p className="review">
                                                        {el.review_cnt > 0 ? (
                                                            <>{el.point}</>
                                                        ) : ""}
                                                        <span> 리뷰 {formatNumber(el.review_cnt)}</span>
                                                    </p>
                                                    <p className="label_info">
                                                        {generalData.icon_list && el.icon && generalData.icon_list.map((icon, idx) => {
                                                            if (el.icon.indexOf(icon.code_cd2) >= 0) {
                                                                return (
                                                                    <picture key={idx}>
                                                                        <source srcSet={`/asset/images/shop/product/p_${icon.code_cd2}.jpg`} media="(min-width:768px)" />
                                                                        <source srcSet={`/asset/images/shop/product/m_${icon.code_cd2}.jpg`} media="(max-width:767px)" />
                                                                        <img src={`/asset/images/shop/product/p_${icon.code_cd2}.jpg`} onError={handleError} alt={icon.code_nm2} />
                                                                    </picture>
                                                                )
                                                            }
                                                        })}
                                                    </p>
                                                </div>
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : ""}
        </>
    )
}