import { mainApi, getProductList, getInsta } from "@apis/mainApi"
import { wish, removeWish } from "@apis/wishApi"
import { useState, useEffect, useContext } from "react"
import Slider from "react-slick";
import { formatNumber } from "@utils/functions";
import { createSearchParams, useNavigate } from "react-router-dom";
import { CdnContext } from "@contexts/cdnContext";
import Cookies from "universal-cookie";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

export default () => {
    const [data, setData] = useState(undefined)
    const [newProduct, setNewProduct] = useState(undefined);
    const [bestProduct, setBestProduct] = useState(undefined);
    const [selectedNew, setSelectedNew] = useState(undefined);
    const [selectedBest, setSelectedBest] = useState(undefined);
    const [instaMode, setInstaMode] = useState("home");
    const [instaImg, setInstaImg] = useState(undefined);
    const [hideCategory, setHideCategory] = useState(true);
    const [width, setWidth] = useState(undefined);
    const [showPop, setShowPop] = useState(true);
    const [mouseMoved, setMouseMoved] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [enableEx, setEnableEx] = useState(true);
    const { baseUrl } = useContext(CdnContext);
    const navigate = useNavigate();

    const fetch = async () => {
        const result = await mainApi();
        setData(result)
        setEnableEx(result.specialList && result.specialList.length > 4)
        if (!window.location.hash) {
            setSelectedNew(result.newMenuTab[0].category_cd)
            setSelectedBest(result.bestMenuTab[0].category_cd)
        }
        return () => { }
    }

    const fetchNewProduct = async (category1_cd, mode) => {
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
        fetchInsta(instaMode)
    }, [instaMode])

    useEffect(() => {
        fetch()

        const handleResize = () => {
            const width = document.documentElement.clientWidth;
            setWidth(width);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        const cookies = new Cookies();
        const show = cookies.get("show")
        setShowPop(show == "Y" || !show)
        return () => {
            window.removeEventListener('resize', handleResize);
        };


    }, [])

    useEffect(() => {
        if (selectedNew) {
            fetchNewProduct(selectedNew, "new")
        }
    }, [selectedNew])

    useEffect(() => {
        if (selectedBest) {
            fetchNewProduct(selectedBest, "best")
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

    const concept_area = {
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "concept_area",
        beforeChange: (oldIdx, newIdx) => {
            setCurrentSlide(newIdx + 1)
        }
    }

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
    }

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

    const pc_slide1 = {
        slidesToScroll: 4,
        infinite: true,
        variableWidth: true,
        slidesToShow: 1,
        centerMode: false,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        className: "pc_slide"
    }

    const m_slide = {
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        className: "m_slide"
    }

    const pop_slide = {
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        className: "slider"
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

    const handleClose = () => {
        setShowPop(false)
    }

    const handleCloseToday = (e) => {
        const currentDate = new Date();
        const expirationDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            23, 59, 59 // Set the time to 23:59:59
        );
        const path = "/";
        const cookies = new Cookies();

        const END_OF_TODAY_MS = (expirationDate.getTime() - currentDate.getTime()) / 1000

        if (e.target.checked) {
            cookies.set("show", "N", { path, maxAge: END_OF_TODAY_MS })
        } else {
            cookies.set("show", "Y", { path, maxAge: END_OF_TODAY_MS })
        }
    }

    return (
        <>
            {data ? (
                <>
                    <div className="content main_page">
                    
                        <Slider {...keyvisual}>
                            {data.mainTopBanner.length > 0 && data.mainTopBanner.map((banner, idx) => (
                                <div key={idx} className="slide">
                                    <div
                                        onMouseMove={() => setMouseMoved(true)}
                                        onMouseDown={() => setMouseMoved(false)}
                                        onClick={() => {
                                            if (!mouseMoved) {
                                                window.location.href = banner.link
                                            }
                                        }}
                                    >
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
                                                    <p className="sub_tit">{banner.content_text2}</p>
                                                    <p className="main_tit">{banner.content_text1}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>

                        {data.mainVisual.length > 0 && (
                            <>
                                <Slider {...concept_area}>
                                    {data.mainVisual.map((banner, idx) => (
                                        <div key={idx} className="slide">
                                            <Link to={banner.link}>
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
                                                            <p className="sub_tit">{banner.content_text2}</p>
                                                            <p className="main_tit">{banner.content_text1}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </Slider>
                                <div className="dots-number">
                                    <div className="border-dots">
                                        <span className="currentSlide">{currentSlide}</span>
                                        <span>/</span>
                                        <span className="lastSlide">{data.mainVisual ? data.mainVisual.length : 1}</span>
                                    </div>
                                </div>
                            </>
                        )}

                      <div className={`box_area category_area ${hideCategory ? "" : "on"}`}>
                            <div className="tit_wrap">
                                <h3 className="mb_hidden">상위 카테고리</h3>
                            </div>
                            
                            {width > 768 ? (
                                 
                                <>
                                    <Slider {...settings}>
                                      
                                        {data.bestMenuTab.length > 0 && data.bestMenuTab.map((cate, idx) => (
                                            <div key={idx} className="slide">
                                                <Link to={`/shop/product/product_lists?sh_category1_cd=${cate.category_cd}`}>
                                                    <picture>
                                                         {/* <!--[if IE 9]><video style="display: none;"><![endif]-->  */}
                                                        <source srcSet={`${baseUrl}/uploads/category/${cate.file_nm1}`} media="(min-width:768px)"></source>
                                                        <source srcSet={`${baseUrl}/uploads/category/${cate.file_nm1}`} media="(max-width:767px)"></source>
                                                         {/* <!--[if IE 9]></video><![endif]-->  */}
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
                                                         {/* <!--[if IE 9]><video style="display: none;"><![endif]-->  */}
                                                        <source srcSet={`${baseUrl}/uploads/category/${cate.file_nm1}`} media="(min-width:768px)"></source>
                                                        <source srcSet={`${baseUrl}/uploads/category/${cate.file_nm1}`} media="(max-width:767px)"></source>
                                                         {/* <!--[if IE 9]></video><![endif]-->  */}
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
  
                        <div className="box_area new_area new_area2">
                            <h3>신상품</h3>
                            <ul className="prd_tab" id="new">
                                {data.newMenuTab.length > 0 && data.newMenuTab.map((mainCate1Row, idx) => (
                                    <li key={idx} className={`${mainCate1Row.category_cd} ${selectedNew == mainCate1Row.category_cd ? "on" : ""}`}>
                                        <Link
                                            
                                            onClick={(e) => {
                                                setSelectedNew(mainCate1Row.category_cd)
                                                // e.preventDefault()
                                            }}
                                            to={`#!`}
                                            className={mainCate1Row.category_cd}
                                            data-mode='t'
                                            data-gb="new"
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(mainCate1Row.category_nm, {
                                                    FORBID_TAGS: ['br']
                                                })
                                            }}
                                        ></Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="prd_tab_wrap">
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
                                                                        !mouseMoved && navigate(`/shop/product/product_view?product_cd=${product.product_cd}`)
                                                                    }}
                                                                    href="#!" key={product_main.file_nm} data-val={product.group_cd} className="a_or_wish" data-group={product.group_yn}>
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
                                                    <Link to={`/shop/product/product_view?product_cd=${product.product_cd}`} data-val={product.product_cd}>
                                                        <p className="tit" dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(product.product_nm, {
                                                                FORBID_TAGS: ['br']
                                                            })
                                                        }}></p>
                                                    </Link>
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
                                                    </span>
                                                    {product.product_state == '4' && (
                                                        <picture>
                                                            <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(min-width:768px)" />
                                                            <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(max-width:767px)" />
                                                            <img src="/asset/images/shop/product/p_2106.jpg " alt="재입고 알림신청" />
                                                        </picture>
                                                    )}
                                                    <p className="review">
                                                        <span> 리뷰 {formatNumber(product.review_cnt)}</span>
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </Slider>
                                    {selectedNew == "150" ? (
                                        <button
                                            type="button"
                                            className="btn_txt more_btn"
                                            onClick={() => navigate('/shop/product/new_product_lists?group_cd=1001')}>
                                            <span>신상품 더 보기</span>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn_txt more_btn"
                                            onClick={() => navigate(`'/shop/product/new_product_lists?group_cd=1001&sh_category1_cd=${selectedNew}`)}>
                                            <span>신상품 더 보기</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="box_area best_area">
                            <h3>베스트</h3>
                            <ul className="prd_tab" id="best">
                                {data.bestMenuTab.length > 0 && data.bestMenuTab.map((mainCate1Row, idx) => (
                                    <li key={idx} className={`${mainCate1Row.category_cd} ${selectedBest == mainCate1Row.category_cd ? "on" : ""}`}>
                                        <Link
                                            onClick={(e) => {
                                                setSelectedBest(mainCate1Row.category_cd)
                                                e.preventDefault()
                                            }}
                                            href={`#!`}
                                            className={mainCate1Row.category_cd}
                                            data-mode='f'
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(mainCate1Row.category_nm, {
                                                    FORBID_TAGS: ['br']
                                                })
                                            }}
                                            data-gb="best"></Link>
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
                                                                        !mouseMoved && navigate(`/shop/product/product_view?product_cd=${product.product_cd}`)
                                                                    }}
                                                                    href="#!"
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
                                                    <Link to={`/shop/product/product_view?product_cd=${product.product_cd}`} data-val={product.product_cd}>
                                                        <p className="tit" dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(product.product_nm, {
                                                                FORBID_TAGS: ['br']
                                                            })
                                                        }}></p>
                                                    </Link>
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
                                                    </span>
                                                    {product.product_state == '4' && (
                                                        <picture>
                                                            <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(min-width:768px)" />
                                                            <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(max-width:767px)" />
                                                            <img src="/asset/images/shop/product/p_2106.jpg " alt="재입고 알림신청" />
                                                        </picture>
                                                    )}
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
                                        onClick={() => navigate(`/shop/product/best_product_lists?group_cd=1002&sh_category1_cd=${selectedBest}`)}>
                                        <span>베스트 더 보기</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="box_area mid_bn_area">
                            <Slider {...m_slide}>
                                {data.mainMiddle && data.mainMiddle.map((middle, idx) => (
                                    <Link key={idx} to={middle.link}>
                                        <div className="slide">
                                            <picture>
                                                {/* <!--[if IE 9]><video style="display: none;"><![endif]--> */}
                                                <source srcSet={`${baseUrl}/uploads/banner/${middle.file_nm1}`} media="(min-width:768px)" />
                                                <source srcSet={`${baseUrl}/uploads/banner/${middle.file_nm2}`} media="(max-width:767px)" />
                                                {/* <!--[if IE 9]></video><![endif]--> */}
                                                <img loading="lazy" src={`${baseUrl}/uploads/banner/${middle.file_nm1}`} alt="" />
                                            </picture>
                                        </div>
                                    </Link>
                                ))}
                            </Slider>
                        </div>

                        <div className="box_area house_area hw_tip">
                            <h3>아망떼 집들이 <span>다양한 아망떼 소식&혜택 만나보기</span></h3>
                            {width > 768 ? (
                                <Slider {...pc_slide1}>
                                    {data.housewarming && data.housewarming.map((house, idx) => (
                                        <li key={idx}>
                                            <div className="box img">
                                                <a
                                                    onMouseMove={() => setMouseMoved(true)}
                                                    onMouseDown={() => setMouseMoved(false)}
                                                    onClick={() => {
                                                        !mouseMoved && navigate(`/shop/housewarming/housewarming_view?event_seq=${house.event_seq}`)
                                                    }}
                                                    href="#!">
                                                    <picture>
                                                        <source srcSet={`${baseUrl}/uploads/housewarming/${house.file_nm1}`} media="(min-width:768px)" />
                                                        <source srcSet={`${baseUrl}/uploads/housewarming/${house.file_nm1}`} media="(max-width:767px)" />
                                                        <img src={`${baseUrl}/uploads/housewarming/${house.file_nm1}`} alt="" />
                                                    </picture>
                                                </a>
                                            </div>
                                            <div className="box">
                                                <p className="tit">
                                                    <Link to={`/shop/housewarming/housewarming_view?event_seq=${house.event_seq}`}>
                                                        {house.event_nm}
                                                    </Link>
                                                </p>
                                                <p>{house.event_con}</p>
                                                <div className="info">
                                                    <p className="ico_comment">{house.com_cnt || 0}</p>
                                                    <p className="ico_like">{house.like_cnt || 0}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </Slider>
                            ) : (
                                <ul className="pc-slide">
                                    {data.housewarming && data.housewarming.map((house, idx) => (
                                        idx <= 6 ? (
                                            <li key={idx}>
                                                <div className="box img">
                                                    <Link to={`/shop/housewarming/housewarming_view?event_seq=${house.event_seq}`}>
                                                        <picture>
                                                            <source srcSet={`${baseUrl}/uploads/housewarming/${house.file_nm1}`} media="(min-width:768px)" />
                                                            <source srcSet={`${baseUrl}/uploads/housewarming/${house.file_nm1}`} media="(max-width:767px)" />
                                                            <img src={`${baseUrl}/uploads/housewarming/${house.file_nm1}`} alt="" />
                                                        </picture>
                                                    </Link>
                                                </div>
                                                <div className="box">
                                                    <p className="tit">
                                                        <Link to={`/shop/housewarming/housewarming_view?event_seq=${house.event_seq}`}>
                                                            {house.event_nm}
                                                        </Link>
                                                    </p>
                                                    <p>{house.event_con}</p>
                                                    <div className="info">
                                                        <p className="ico_comment">{house.com_cnt || 0}</p>
                                                        <p className="ico_like">{house.like_cnt || 0}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : ""
                                    ))}
                                </ul>
                            )}
                            <button
                                type="button"
                                className="btn_txt more_btn"
                                onClick={() => navigate('/shop/housewarming/housewarming_lists')}>
                                <span>아망떼 집들이 더 보기</span>
                            </button>
                        </div>

                        <div className="box_area keyword_area">
                            <h3>인기 키워드</h3>
                            <ul>
                                {data.mainKeyword && data.mainKeyword.map((keyword, idx) => (
                                    <li key={idx}>
                                        <Link to={keyword.link}>
                                            <picture>
                                                <source srcSet={`${baseUrl}/uploads/banner/${keyword.file_nm1}`} media="(min-width:768px)" />
                                                <source srcSet={`${baseUrl}/uploads/banner/${keyword.file_nm2}`} media="(max-width:767px)" />
                                                <img loading="lazy" src={`${baseUrl}/uploads/banner/${keyword.file_nm1}`} alt="" />
                                            </picture>
                                            <div className="t">
                                                <div className="tc">{keyword.banner_nm}</div>
                                            </div>
                                        </Link>
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
                                            <a key={idx} className="item"
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
                                            </a>
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

                    {data.mainPopup && data.mainPopup.length ? (
                        <div className="layer_box alert bg_layer main_layer" id="main_layer" style={{ display: showPop ? "block" : "none" }}>
                            <div className="layer_outer">
                                <div className="layer_inner">
                                    <div className="layer_con">
                                        <button type="button" onClick={handleClose} className="layer_close">닫기</button>
                                        <div className="con">
                                            <Slider {...pop_slide}>
                                                {data.mainPopup && data.mainPopup.map((popup, idx) => (
                                                    <div key={idx}>
                                                        <Link to={popup.link}>
                                                            <picture>
                                                                <source srcSet={`${baseUrl}/uploads/banner/${popup.file_nm1}`} media="(min-width:1024px)" />
                                                                <source srcSet={`${baseUrl}/uploads/banner/${popup.file_nm2}`} media="(max-width:1023px)" />
                                                                <img src={`${baseUrl}/uploads/banner/${popup.file_nm1}`} alt="" />
                                                            </picture>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                        <div className="not_today">
                                            <div className="design_checkbox">
                                                <input onChange={handleCloseToday} type="checkbox" id="not_today" />
                                                <label htmlFor="not_today">오늘 하루 보지 않기</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ""}
                </>
            ) : ""}
        </>
    )
}