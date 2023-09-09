import { shoppingHomeApi } from "@apis/shoppingHomeApi"
import { getProductList, getInsta } from "@apis/mainApi"
import { formatNumber } from "@utils/functions";
import { useState, useEffect, useContext } from "react"
import Slider from "react-slick"
import { useNavigate } from "react-router";
import { CdnContext } from "@contexts/cdnContext";
import { wish, removeWish } from "@apis/wishApi"
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

export default () => {
    const [data, setData] = useState(undefined)
    const [hideCategory, setHideCategory] = useState(true);
    const [width, setWidth] = useState(undefined);
    const [bestProduct, setBestProduct] = useState(undefined);
    const [newProduct, setNewProduct] = useState(undefined);
    const [selectedNew, setSelectedNew] = useState(undefined);
    const [selectedBest, setSelectedBest] = useState(undefined);
    const [instaMode, setInstaMode] = useState("home");
    const [mouseMoved, setMouseMoved] = useState(true)
    const [instaImg, setInstaImg] = useState(undefined);
    const [enableEx, setEnableEx] = useState(true)
    const { baseUrl } = useContext(CdnContext)
    const navigate = useNavigate()

    const fetchShoppingHome = async () => {
        const response = await shoppingHomeApi();
        setData(response)
        setEnableEx(response.specialList && response.specialList.length > 4)
        if (!window.location.hash) {
            setSelectedNew(response.newMenuTab[0].category_cd)
            setSelectedBest(response.bestMenuTab[0].category_cd)
        }
        return () => { }
    }

    const fetchProduct = async (category1_cd, mode) => {
        const result = await getProductList(category1_cd, mode)
        if (mode == "new") {
            setNewProduct(result)
        }

        if (mode == "best") {
            setBestProduct(result)
        }
        return () => { }
    }

    const fetchInsta = async (mode) => {
        const result = await getInsta(mode)
        setInstaImg(result)
        return () => { }
    }

    useEffect(() => {
        fetchShoppingHome()

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
        fetchInsta(instaMode)
    }, [instaMode])

    useEffect(() => {
        if (selectedNew) {
            fetchProduct(selectedNew, "new")
        }
    }, [selectedNew])

    useEffect(() => {
        if (selectedBest) {
            fetchProduct(selectedBest, "best")
        }
    }, [selectedBest])

    const settings = {
        dots: false,
        arrow: true,
        infinite: false,
        centerMode: false,
        slidesToShow: 10,
        slidesToScroll: 4,
        className: "c_slide"
    };

    const keyvisual = {
        dots: true,
        arrows: false,
        variableWidth: false,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        className: "keyvisual_area"
    };

    const pc_slide = {
        centerMode: false,
        variableWidth: true,
        slidesToScroll: 4,
        slidesToShow: 1,
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        className: "pc_slide",
    }

    const m_slide = {
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        className: "m_slide"
    }

    const pc_slide1 = {
        slidesToScroll: 1,
        slidesToShow: 1,
        infinite: true,
        variableWidth: true,
        centerMode: false,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        className: "pc_slide"
    }

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
            {data ? (
                <div className="content main_page">
                    <Slider {...keyvisual}>
                        {data.topBanner.length > 0 && data.topBanner.map((banner, idx) => (
                            <div key={idx} className="slide">
                                <div
                                    onMouseMove={() => setMouseMoved(true)}
                                    onMouseDown={() => setMouseMoved(false)}
                                    onClick={() => {
                                        if (!mouseMoved) {
                                            window.location.href = banner.link
                                        }
                                    }}>
                                    <div className="img">
                                        <picture>
                                            {/* <!--[if IE 9]><video style="display: none;"><![endif]--> */}
                                            {/* <!-- pc이미지 --> */}
                                            <source srcSet={`${baseUrl}/uploads/banner/${banner.file_nm1}`} media="(min-width:768px)"></source>
                                            {/* <!-- mb이미지 --> */}
                                            <source srcSet={`${baseUrl}/uploads/banner/${banner.file_nm2}`} media="(max-width:767px)"></source>
                                            {/* <!--[if IE 9]></video><![endif]--></a> */}
                                            {/* <!-- pc이미지 --> */}
                                            <img src={`${baseUrl}/uploads/banner/${banner.file_nm1}`} alt=""></img>
                                        </picture>
                                    </div>
                                    <div className="txt">
                                        <div className="t">
                                            <div className="tc">
                                                <p className="sub_tit" style={{ color: `#${banner.text1_rgb}` }}>{banner.content_text1}</p>
                                                <p className="main_tit" style={{ color: `#${banner.text2_rgb}` }}>{banner.content_text2}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>

                    <div className={`box_area category_area ${hideCategory ? "" : "on"}`}>
                        <div className="tit_wrap">
                            <h3 className="mb_hidden">카테고리별 상품 찾기</h3>
                        </div>
                        {width > 768 ? (
                            <>
                                <Slider {...settings}>
                                    {data.category.length > 0 && data.category.map((cate, idx) => (
                                        <div key={idx} className="slide">
                                            <Link to={`/shop/product/product_lists?sh_category1_cd=${cate.category_cd}`}>
                                                <picture>
                                                    {/* <!--[if IE 9]><video style="display: none;"><![endif]--> */}
                                                    <source srcSet={`${baseUrl}/uploads/category/${cate.file_nm1}`} media="(min-width:768px)"></source>
                                                    <source srcSet={`${baseUrl}/uploads/category/${cate.file_nm1}`} media="(max-width:767px)"></source>
                                                    {/* <!--[if IE 9]></video><![endif]--> */}
                                                    <img src={`${baseUrl}/uploads/category/${cate.file_nm1}`} alt=""></img>
                                                </picture>
                                                <span dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(cate.category_nm, {
                                                        FORBID_TAGS: ['br']
                                                    })
                                                }}></span>
                                            </Link>
                                        </div>
                                    ))}
                                </Slider>
                                <button type="button" className="btn_txt more_btn more_right" onClick={() => setHideCategory(!hideCategory)}>
                                    <span>{hideCategory ? "더 보기" : "접기"} </span>
                                </button>
                            </>

                        ) : (
                            <>
                                <div className="c_slide">
                                    {data.category.length > 0 && data.category.map((cate, idx) => (
                                        <div key={idx} className="slide">
                                            <Link to={`/shop/product/product_lists?sh_category1_cd=${cate.category_cd}`}>
                                                <picture>
                                                    {/* <!--[if IE 9]><video style="display: none;"><![endif]--> */}
                                                    <source srcSet={`${baseUrl}/uploads/category/${cate.file_nm1}`} media="(min-width:768px)"></source>
                                                    <source srcSet={`${baseUrl}/uploads/category/${cate.file_nm1}`} media="(max-width:767px)"></source>
                                                    {/* <!--[if IE 9]></video><![endif]--> */}
                                                    <img src={`${baseUrl}/uploads/category/${cate.file_nm1}`} alt=""></img>
                                                </picture>
                                                <span dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(cate.category_nm, {
                                                        FORBID_TAGS: ['br']
                                                    })
                                                }}></span>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" className="btn_txt more_btn more_right" onClick={() => setHideCategory(!hideCategory)}>
                                    <span>{hideCategory ? "더 보기" : "접기"} </span>
                                </button>
                            </>
                        )}

                    </div>

                    <div className="box_area best_area">
                        <h3>베스트</h3>
                        <ul className="prd_tab" id="best">
                            {data.bestMenuTab.length > 0 && data.bestMenuTab.map((mainCate1Row, idx) => (
                                <li key={idx} className={`${mainCate1Row.category_cd} ${selectedBest == mainCate1Row.category_cd ? "on" : ""}`}>
                                    <a
                                        onClick={(e) => {
                                            navigate(`/shop/product/best_product_list?group_cd=1002&sh_category1_cd=${mainCate1Row.category_cd}`)
                                            e.preventDefault()
                                        }}
                                        href={`#`}
                                        className={mainCate1Row.category_cd}
                                        data-mode='f'
                                        data-gb="best" dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(mainCate1Row.category_nm, {
                                                FORBID_TAGS: ['br']
                                            })
                                        }}></a>
                                </li>
                            ))}
                        </ul>
                        <div className="prd_tab_wrap best_div_wrap">
                            <div className="prd_list" id={selectedBest}>
                                <Slider {...pc_slide} arrows={width > 768} className={`pc_slide best_list${selectedBest}`}>
                                    {bestProduct && bestProduct.map((product) => (
                                        <li key={product.product_cd} id={product.product_cd} className="slide_num0">
                                            <div className="box">
                                                <div className="img_area">
                                                    <div className="img js_list_img">
                                                        {product.product_main_list ? product.product_main_list.map((product_main, idx) => (
                                                            <a
                                                                onMouseMove={() => setMouseMoved(true)}
                                                                onMouseDown={() => setMouseMoved(false)}
                                                                onClick={() => {
                                                                    if (!mouseMoved) {
                                                                        !mouseMoved && navigate(`/shop/product/product_view?product_cd=${product.product_cd}`)
                                                                    }
                                                                }}
                                                                key={product_main.file_nm} data-val={product.group_cd} className="a_or_wish" data-group={product.group_yn}>
                                                                <picture>
                                                                    {/* <!--[if IE 9]><video style="display: none;"><![endif]--> */}
                                                                    {/* <!-- pc이미지 --> */}
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} media="(min-width:768px)" />
                                                                    {/* <!-- mb이미지 --> */}
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} media="(min-width:767px)" />
                                                                    {/* <!--[if IE 9]></video><![endif]--> */}
                                                                    {/* <!-- pc이미지 --> */}
                                                                    <img src={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} />
                                                                </picture>
                                                            </a>
                                                        )) : ""}
                                                    </div>
                                                    <button type="button" onClick={(e) => handleLike(product.product_cd, e)} className={`btn_wish ${product.wish_click_on ? product.wish_click_on : ""}  wish_${product.product_cd}`}>위시리스트 담기</button>
                                                </div>
                                                <a href={`/shop/product/product_view?product_cd=${product.product_cd}`} data-val={product.product_cd}>
                                                    <p className="tit" dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(product.product_nm, {
                                                            FORBID_TAGS: ['br']
                                                        })
                                                    }}></p>
                                                </a>
                                                <span className={`price ${product.product_state == "4" ? "sold_out" : ""}`}>
                                                    {product.supply_price != product.sale_price ? (
                                                        <>
                                                            <del>
                                                                {formatNumber(product.supply_price)}원
                                                            </del>
                                                            <span className="ms-1">
                                                                {product.discount_gb !== "B" ?
                                                                    `${product.fee_rate}%`
                                                                    : `${Math.round(((product.supply_price - product.sale_price) / product.supply_price) * 100)}%`}
                                                            </span>
                                                            <ins>
                                                                {formatNumber(product.sale_price)}원
                                                            </ins>
                                                        </>
                                                    ) : (
                                                        <ins>{formatNumber(product.sale_price)}원</ins>
                                                    )}
                                                    {product.product_state == '4' && (
                                                        <picture>
                                                            <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(min-width:768px)" />
                                                            <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(max-width:767px)" />
                                                            <img src="/asset/images/shop/product/p_2106.jpg " alt="재입고 알림신청" />
                                                        </picture>
                                                    )}
                                                </span>
                                                <p className="review">
                                                    <span> 리뷰 {formatNumber(product.review_cnt)}</span>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </Slider>
                                <button
                                    type="button"
                                    className="btn_txt more_btn"
                                    onClick={() => navigate(`/shop/product/best_product_lists?group_cd=1002`)}>
                                    <span>베스트 더 보기</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="box_area new_area">
                        <h3>신상품</h3>
                        <ul className="prd_tab" id="new">
                            {data.newMenuTab.length > 0 && data.newMenuTab.map((mainCate1Row, idx) => (
                                <li key={idx} className={`${mainCate1Row.category_cd} ${selectedNew == mainCate1Row.category_cd ? "on" : ""}`}>
                                    <a
                                        onClick={(e) => {
                                            setSelectedNew(mainCate1Row.category_cd)
                                            e.preventDefault()
                                        }}
                                        href={`#`}
                                        className={mainCate1Row.category_cd}
                                        data-mode='t'
                                        data-gb="new" dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(mainCate1Row.category_nm, {
                                                FORBID_TAGS: ['br']
                                            })
                                        }}></a>
                                </li>
                            ))}
                        </ul>
                        <div className="prd_tab_wrap product_home_page">
                            <div className="prd_list" id={selectedNew}>
                                <Slider {...pc_slide} arrows={width > 768} className={`pc_slide new_list${selectedNew}`}>
                                    {newProduct && newProduct.map((product) => (
                                        <li key={product.product_cd} id={product.product_cd} className="slide_num0">
                                            <div className="box">
                                                <div className="img_area">
                                                    <div id="img_js_list_img" className="img js_list_img">
                                                        {product.product_main_list ? product.product_main_list.map((product_main, idx) => (
                                                            <a
                                                                onMouseMove={() => setMouseMoved(true)}
                                                                onMouseDown={() => setMouseMoved(false)}
                                                                onClick={() => {
                                                                    if (!mouseMoved) {
                                                                        !mouseMoved && navigate(`/shop/product/product_view?product_cd=${product.product_cd}`)
                                                                    }
                                                                }}
                                                                key={product_main.file_nm} data-val={product.group_cd} className="a_or_wish" data-group={product.group_yn}>
                                                                <picture>
                                                                    {/* <!--[if IE 9]><video style="display: none;"><![endif]--> */}
                                                                    {/* <!-- pc이미지 --> */}
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} media="(min-width:768px)" />
                                                                    {/* <!-- mb이미지 --> */}
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} media="(min-width:767px)" />
                                                                    {/* <!--[if IE 9]></video><![endif]--> */}
                                                                    {/* <!-- pc이미지 --> */}
                                                                    <img src={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} />
                                                                </picture>
                                                            </a>
                                                        )) : ""}
                                                    </div>
                                                    <button type="button" onClick={(e) => handleLike(product.product_cd, e)} className={`btn_wish ${product.wish_click_on ? product.wish_click_on : ""}  wish_${product.product_cd}`}>위시리스트 담기</button>
                                                </div>
                                                <a href={`/shop/product/product_view?product_cd=${product.product_cd}`} data-val={product.product_cd}>
                                                    <p className="tit" dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(product.product_nm, {
                                                            FORBID_TAGS: ['br']
                                                        })
                                                    }}></p>
                                                </a>
                                                <span className={`price ${product.product_state == "4" ? "sold_out" : ""}`}>
                                                    {product.supply_price != product.sale_price ? (
                                                        <>
                                                            <del>
                                                                {formatNumber(product.supply_price)}원
                                                            </del>
                                                            <span className="ms-1">
                                                                {product.discount_gb !== "B" ?
                                                                    `${product.fee_rate}%`
                                                                    : `${Math.round(((product.supply_price - product.sale_price) / product.supply_price) * 100)}%`}
                                                            </span>
                                                            <ins>
                                                                {formatNumber(product.sale_price)}원
                                                            </ins>
                                                        </>
                                                    ) : (
                                                        <ins>{formatNumber(product.sale_price)}원</ins>
                                                    )}
                                                    {product.product_state == '4' && (
                                                        <picture>
                                                            <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(min-width:768px)" />
                                                            <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(max-width:767px)" />
                                                            <img src="/asset/images/shop/product/p_2106.jpg " alt="재입고 알림신청" />
                                                        </picture>
                                                    )}
                                                </span>
                                                <p className="review">
                                                    <span> 리뷰 {formatNumber(product.review_cnt)}</span>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </Slider>
                                <button
                                    type="button"
                                    className="btn_txt more_btn"
                                    onClick={() => navigate('/shop/product/new_product_lists?group_cd=1001')}>
                                    <span>신상품 더 보기</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="box_area mid_bn_area">
                        <Slider {...m_slide}>
                            {data.middleBanner && data.middleBanner.map((middle, idx) => (
                                <a key={idx} href={middle.link} target={middle.link_gb === "out" ? "_blank" : "_self"}>
                                    <div className="slide">
                                        <picture>
                                            {/* <!--[if IE 9]><video style="display: none;"><![endif]--> */}
                                            <source srcSet={`/uploads/banner/${middle.file_nm1}`} media="(min-width:768px)" />
                                            <source srcSet={`/uploads/banner/${middle.file_nm2}`} media="(max-width:767px)" />
                                            {/* <!--[if IE 9]></video><![endif]--> */}
                                            <img loading="lazy" src={`/uploads/banner/${middle.file_nm1}`} alt="" />
                                        </picture>
                                    </div>
                                </a>
                            ))}
                        </Slider>
                    </div>

                    <div className="box_area hotdel_area product_lists_page sale_lists_page">
                        <h3>{data.hotdeal && data.hotdeal.name}</h3>
                        <div className="must_buy_this">
                            <div className="prd_list">
                                {width > 786 ? (
                                    <Slider {...pc_slide1}>
                                        {data.hotdeal && data.hotdeal.products.map((deal, idx) => {
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
                                                        <a href={`/shop/product/product_view?product_cd=${deal.product_cd}`} className="box">
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
                                                            <p className="tit" dangerouslySetInnerHTML={{ __html: deal.product_nm }}></p>
                                                        </a>
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
                                                    <li className="coming_soon">
                                                        <a href={`/shop/product/product_view?product_cd=${deal.product_cd}`} className="box">
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
                                                            <p className="tit" dangerouslySetInnerHTML={{ __html: deal.product_nm }}></p>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            return rd
                                        })}
                                    </Slider>
                                ) : (
                                    <div className="pc_slide d-flex gap-2">
                                        {data.hotdeal && data.hotdeal.products.map((deal, idx) => {
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
                                                        <a href={`/shop/product/product_view?product_cd=${deal.product_cd}`} className="box">
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
                                                            <p className="tit" dangerouslySetInnerHTML={{ __html: deal.product_nm }}></p>

                                                        </a>
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
                                                    <li className="coming_soon">
                                                        <a href={`/shop/product/product_view?product_cd=${deal.product_cd}`} className="box">
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
                                                            <p className="tit" dangerouslySetInnerHTML={{ __html: deal.product_nm }}></p>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            return rd
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="box_area keyword_area">
                        <h3>인기 키워드</h3>
                        <ul>
                            {data.keyword && data.keyword.map((keyword, idx) => (
                                <li key={idx}>
                                    <a href={keyword.link} target={keyword.link_gb == "out" ? "_blank" : "_self"}>
                                        <picture>
                                            <source srcSet={`${baseUrl}/uploads/banner/${keyword.file_nm1}`} media="(min-width:768px)" />
                                            <source srcSet={`${baseUrl}/uploads/banner/${keyword.file_nm2}`} media="(max-width:767px)" />
                                            <img loading="lazy" src={`${baseUrl}/uploads/banner/${keyword.file_nm1}`} alt="" />
                                        </picture>
                                        <div className="t">
                                            <div className="tc">{keyword.banner_nm}</div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="box_area special_exhibition_area">
                        <h3>오늘의 기획전</h3>
                        {width > 768 ? (
                            <Slider
                                {...pc_slide}
                                swipe={enableEx}
                                autoplay={enableEx}
                                infinite={enableEx}
                                accessibility={enableEx}
                                arrows={enableEx}
                                draggable={enableEx}
                                className="pc_slide item_area">

                                {data.specialList && data.specialList.map((special, idx) => (
                                    <div key={idx} className="item"
                                        onMouseMove={() => setMouseMoved(true)}
                                        onMouseDown={() => setMouseMoved(false)}
                                        onClick={() => {
                                            !mouseMoved && navigate(`/shop/special/special_product_view?seq=${special.theme_seq}`)
                                        }}>
                                        <picture>
                                            <source srcSet={`${baseUrl}/uploads/theme/${special.file_nm2}`} media="(min-width:768px)" />
                                            <source srcSet={`${baseUrl}/uploads/theme/${special.file_nm2}`} media="(max-width:767px)" />
                                            <img src={`${baseUrl}/uploads/theme/${special.file_nm2}`} alt="" />
                                        </picture>
                                        <div className="txt">
                                            <h4>{special.theme_nm}</h4>
                                            <p>{special.theme_con}</p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <div className="pc_slide item_area">
                                {data.specialList && data.specialList.map((special, idx) => (
                                    idx < 3 ? (
                                        <div key={idx} className="item"
                                            onMouseMove={() => setMouseMoved(true)}
                                            onMouseDown={() => setMouseMoved(false)}
                                            onClick={() => {
                                                !mouseMoved && navigate(`/shop/special/special_product_view?seq=${special.theme_seq}`)
                                            }}>
                                            <picture>
                                                <source srcSet={`${baseUrl}/uploads/theme/${special.file_nm2}`} media="(min-width:768px)" />
                                                <source srcSet={`${baseUrl}/uploads/theme/${special.file_nm2}`} media="(max-width:767px)" />
                                                <img src={`${baseUrl}/uploads/theme/${special.file_nm2}`} alt="" />
                                            </picture>
                                            <div className="txt">
                                                <h4>{special.theme_nm}</h4>
                                                <p>{special.theme_con}</p>
                                            </div>
                                        </div>
                                    ) : ""
                                ))}
                            </div>
                        )}
                        <button type="button" className="btn_txt btn_lgray more_btn" onClick={() => navigate('/shop/special/special_product_lists')}>기획전 더 보기</button>
                    </div>

                    <div className="box_area insta_area">
                        <h3>
                            <a href={"#"} onClick={(e) => {
                                setInstaMode("home")
                                e.preventDefault()
                            }}
                                id="insta_a"
                                style={{ display: "inline-block", color: instaMode == "home" ? "" : "#999" }}>#아망떼</a>

                            <a
                                href={"#"}
                                onClick={(e) => { setInstaMode("pet"); e.preventDefault() }}
                                id="insta_p"
                                style={{ display: "inline-block", marginLeft: "10px", color: instaMode == "pet" ? "" : "#999", }}>#아망떼 펫</a>
                            <span>인스타그램에서 더 핫한 아망떼 상품을 확인하세요</span>
                        </h3>

                        <div className={`img_area ${instaMode == "home" ? "insta_div" : "insta_pet_div"}`}>
                            {instaImg && instaImg.map((insta, idx) => (
                                <div key={idx} className="img">
                                    <a href={insta.permalink} target="_blank">
                                        <picture>
                                            <source srcSet={insta.media_url} media="(min-width:768px)" />
                                            <source srcSet={insta.media_url} media="(max-width:767px)" />
                                            <img src={insta.media_url} alt="" />
                                        </picture>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : ""}
        </>
    )
}