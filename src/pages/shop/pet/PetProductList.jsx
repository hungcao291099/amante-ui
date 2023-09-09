import { getData, getProductByMode, getProductListByGroup } from "@apis/PetProductApi"
import { useEffect, useState, useContext } from "react"
import { CdnContext } from "@contexts/cdnContext"
import Slider from "react-slick"
import { useNavigate } from "react-router"
import { formatNumber } from "@utils/functions"
import { wish, removeWish } from "@apis/wishApi"
import DOMPurify from "dompurify"

export default () => {
    const [shopList, setShopList] = useState(undefined)
    const [data, setData] = useState(undefined)
    const [newProduct, setNewProduct] = useState(undefined)
    const [bestProduct, setBestProduct] = useState(undefined)
    const { baseUrl } = useContext(CdnContext)
    const [mouseMoved, setMouseMoved] = useState(true)
    const [width, setWidth] = useState(undefined);
    const [groupCode, setGroupCode] = useState(undefined)
    const [categoryCode, setCategoryCode] = useState(undefined)
    const navigate = useNavigate()

    const fetchData = async () => {
        const result = await getData()
        setData(result)
        setCategoryCode(result.category[0].category_cd)
        await fetchProduct("new", undefined)
        await fetchShopList(result.iconList[0].group_cd)
        return () => { }
    }

    const fetchShopList = async (group_cd) => {
        const result = await getProductListByGroup(group_cd)
        setShopList(result.data)
        return () => { }
    }

    const fetchProduct = async (mode, cate) => {
        const result = await getProductByMode(mode, cate)
        if (mode == "best") setBestProduct(result.data)
        if (mode == "new") setNewProduct(result.data)
        return () => { }
    }

    useEffect(() => {
        if (groupCode) {
            fetchShopList(groupCode)
        }
    }, [groupCode])

    useEffect(() => {
        if (categoryCode) {
            fetchProduct("best", categoryCode)
        }
    }, [categoryCode])

    useEffect(() => {
        fetchData()

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


    const slider = {
        dots: true,
        arrows: false,
        variableWidth: false,
        centerMode: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        className: "slider"
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


    const handleError = (e) => {
        e.target.style.display = "none"
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
                <div className="content product product_lists_page pet_lists_page">
                    <div className="prd_homde_keyvisual">
                        <Slider {...slider}>
                            {data.bannerTop && data.bannerTop.map((banner, idx) => (
                                <div key={idx}>
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
                                                <source srcSet={`${baseUrl}/uploads/banner/${banner.file_nm1}`} media="(min-width:768px)" />
                                                <source srcSet={`${baseUrl}/uploads/banner/${banner.file_nm2}`} media="(max-width:767px)" />
                                                <img src={`${baseUrl}/uploads/banner/${banner.file_nm1}`} alt="" />
                                            </picture>
                                        </div>
                                        <div className="txt">
                                            <div className="t">
                                                <div className="tc">
                                                    <p className="sub_tit" style={{ color: banner.text1_rgb }}>{banner.content_text1}</p>
                                                    <p className="main_tit" style={{ color: banner.text2_rgb }} dangerouslySetInnerHTML={{ __html: banner.content_text2 }}></p>
                                                    <p className="main_tit" style={{ color: banner.text3_rgb }}>{banner.content_text3}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="wrap">
                        <ul className="round_tab2 tab2">
                            {data.category && data.category.map((cate, idx) => (
                                <li key={idx}>
                                    <a href={`/shop/product/product_lists?sh_category1_cd=${cate.category_m_cd}&sh_category2_cd=${cate.category_cd}`}>
                                        {cate.category_nm}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <ul className="quick_icon_btn">
                            {data.iconList && data.iconList.map((icon, idx) => (
                                <li key={idx}>
                                    <a href="#"
                                        onClick={(e) => {
                                            setGroupCode(icon.group_cd)
                                            e.preventDefault()
                                        }}
                                        style={{ backgroundImage: `url('${baseUrl}/uploads/group/${width > 768 ? icon.file_nm1 : icon.file_nm2}')` }}>
                                        {icon.group_nm}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="pet_box default_box box_area best_area">
                            <div className="tit_area">
                                <h2>
                                    Amante Pet
                                    <span>아망떼가 만들면 믿을 수 있습니다</span>
                                </h2>
                            </div>
                            <div className="prd_tab_wrap product_home_page">
                                <div className="prd_list">
                                    <Slider {...pc_slide} arrows={width > 768} className={`pc_slide new_list`}>
                                        {shopList && shopList.map((product) => (
                                            <li key={product.product_cd} id={product.product_cd}>
                                                <div className="box">
                                                    <div className="img_area">
                                                        <div id="img_js_list_img" className="img js_list_img">
                                                            {product.product_main_list ? product.product_main_list.map((product_main, idx) => (
                                                                <a href={`/shop/product/product_view?product_cd=${product.product_cd}`}  key={product_main.file_nm} data-val={product.group_cd} className="a_or_wish" data-group={product.group_yn}>
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
                                                    <p className="label_info">
                                                        {data.iconCodeList && product.icon && data.iconCodeList.map((icon, idx) => {
                                                            if (product.icon.indexOf(icon.code_cd2) >= 0) {
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
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </div>

                        <div className="pet_box best_box box_area best_area">
                            <div className="tit_area">
                                <h2>베스트</h2>
                                <a href="/shop/product/best_product_lists?group_cd=1002&sh_category1_cd=14" className="more">더보기</a>
                            </div>
                            <div className="tab col3">
                                <ul id="cate_ul">
                                    {data.category && data.category.map((cate, idx) => (
                                        <li className={categoryCode == cate.category_cd ? "on" : ""} key={idx} id={`li_${cate.category_cd}`}>
                                            <a href="#" onClick={(e) => {
                                                setCategoryCode(cate.category_cd)
                                                e.preventDefault()
                                            }} dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(cate.category_nm, {
                                                    FORBID_TAGS: ['br']
                                                })
                                            }}>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="prd_tab_wrap product_home_page">
                                <div className="prd_list">
                                    <Slider {...pc_slide} arrows={width > 768} className={`pc_slide new_list`}>
                                        {bestProduct && bestProduct.map((product) => (
                                            <li key={product.product_cd} id={product.product_cd}>
                                                <div className="box">
                                                    <div className="img_area">
                                                        <div id="img_js_list_img" className="img js_list_img">
                                                            {product.product_main_list ? product.product_main_list.map((product_main, idx) => (
                                                                <a href={`/shop/product/product_view?product_cd=${product.product_cd}`} key={product_main.file_nm} data-val={product.group_cd} className="a_or_wish" data-group={product.group_yn}>
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
                                                    <p className="label_info">
                                                        {data.iconCodeList && product.icon && data.iconCodeList.map((icon, idx) => {
                                                            if (product.icon.indexOf(icon.code_cd2) >= 0) {
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
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </div>

                        <div className="pet_box new_box box_area best_area">
                            <div className="tit_area">
                                <h2>신상품</h2>
                                <a href="/shop/product/new_product_lists?group_cd=1001&sh_category1_cd=14" className="more">더보기</a>
                            </div>
                            <div className="prd_tab_wrap product_home_page">
                                <div className="prd_list">
                                    <Slider {...pc_slide} arrows={width > 768} className={`pc_slide new_list`}>
                                        {newProduct && newProduct.map((product) => (
                                            <li key={product.product_cd} id={product.product_cd}>
                                                <div className="box">
                                                    <div className="img_area">
                                                        <div id="img_js_list_img" className="img js_list_img">
                                                            {product.product_main_list ? product.product_main_list.map((product_main, idx) => (
                                                                <a href={`/shop/product/product_view?product_cd=${product.product_cd}`} key={product_main.file_nm} data-val={product.group_cd} className="a_or_wish" data-group={product.group_yn}>
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
                                                    <p className="label_info">
                                                        {data.iconCodeList && product.icon && data.iconCodeList.map((icon, idx) => {
                                                            if (product.icon.indexOf(icon.code_cd2) >= 0) {
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
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </div>

                        <div className="pc_banner mb_hidden">
                            <Slider {...slider}>
                                {data.bannerCenter && data.bannerCenter.map((banner, idx) => (
                                    <div key={idx}>
                                        <div
                                            onMouseMove={() => setMouseMoved(true)}
                                            onMouseDown={() => setMouseMoved(false)}
                                            onClick={() => {
                                                if (!mouseMoved) {
                                                    navigate(banner.link)
                                                }
                                            }}>
                                            <div className="img">
                                                <picture>
                                                    <source srcSet={`${baseUrl}/uploads/banner/${banner.file_nm1}`} media="(min-width:768px)" />
                                                    <source srcSet={`${baseUrl}/uploads/banner/${banner.file_nm2}`} media="(max-width:767px)" />
                                                    <img src={`${baseUrl}/uploads/banner/${banner.file_nm1}`} alt="" />
                                                </picture>
                                            </div>
                                            <div className="txt">
                                                <div className="t">
                                                    <div className="tc">
                                                        <p className="sub_tit" style={{ color: banner.text1_rgb }}>{banner.content_text1}</p>
                                                        <p className="main_tit" style={{ color: banner.text2_rgb }} dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(banner.content_text2, {
                                                                FORBID_TAGS: ['br']
                                                            })
                                                        }}></p>
                                                        <p className="main_tit" style={{ color: banner.text3_rgb }}>{banner.content_text3}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        <div className="pet_box boast_box box_area house_area hw_tip">
                            <div className="tit_area">
                                <h2>
                                    댕냥 자랑 콘테스트
                                    <span>귀염뽀짝 댕냥 자랑하고 2,000원 할인쿠폰 받아요!</span>
                                </h2>
                                <a href="/shop/event/promotion_view?no=9" className="more">더보기</a>
                            </div>
                            {width > 768 ? (
                                <Slider {...pc_slide1}>
                                    {data.eventList && data.eventList.map((house, idx) => (
                                        <li key={idx}>
                                            <div className="box img">
                                                <a href={`/shop/event/promotion_detail?no=${house.event_board_seq}`}>
                                                    <picture>
                                                        <source srcSet={`${baseUrl}/uploads/event/${house.file_nm1}`} media="(min-width:768px)" />
                                                        <source srcSet={`${baseUrl}/uploads/event/${house.file_nm1}`} media="(max-width:767px)" />
                                                        <img src={`${baseUrl}/uploads/event/${house.file_nm1}`} alt="" />
                                                    </picture>
                                                </a>
                                            </div>
                                            <div className="box">
                                                <p className="tit">
                                                    <a href={`/shop/event/promotion_detail?no=${house.event_board_seq}`}>
                                                        {house.event_nm}
                                                    </a>
                                                </p>
                                                <p>{house.user_id.substring(0, 3)}***</p>
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
                                    {data.eventList && data.eventList.map((house, idx) => (
                                        <>
                                            {idx <= 6 ? (
                                                <li key={idx}>
                                                    <div className="box img">
                                                        <a href={`/shop/event/promotion_detail?no=${house.event_board_seq}`}>
                                                            <picture>
                                                                <source srcSet={`${baseUrl}/uploads/event/${house.file_nm1}`} media="(min-width:768px)" />
                                                                <source srcSet={`${baseUrl}/uploads/event/${house.file_nm1}`} media="(max-width:767px)" />
                                                                <img src={`${baseUrl}/uploads/event/${house.file_nm1}`} alt="" />
                                                            </picture>
                                                        </a>
                                                    </div>
                                                    <div className="box">
                                                        <p className="tit">
                                                            <a href={`/shop/event/promotion_detail?no=${house.event_board_seq}`}>
                                                                {house.event_nm}
                                                            </a>
                                                        </p>
                                                        <p>{house.user_id.substring(0, 3)}***</p>
                                                        <div className="info">
                                                            <p className="ico_comment">{house.com_cnt || 0}</p>
                                                            <p className="ico_like">{house.like_cnt || 0}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ) : ""}
                                        </>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="box_area special_exhibition_area pet_box se_box">
                            <div className="tit_area">
                                <h2>펫 기획전</h2>
                                <a href="/shop/special/special_product_lists" className="more">더보기</a>
                            </div>
                            <Slider {...pc_slide} className="pc_slide item_area">
                                {data.specialList && data.specialList.map((special, idx) => (
                                    <div key={idx} className="item" onClick={() => navigate(`/shop/special/special_product_view?seq=${special.theme_seq}`)} style="cursor: pointer;">
                                        <picture>
                                            <source srcSet={`${baseUrl}/uploads/theme/${special.file_nm2}`} media="(min-width:768px)" />
                                            <source srcSet={`${baseUrl}/uploads/theme/${special.file_nm2}`} media="(max-width:767px)" />
                                            <img loading="lazy" src={`${baseUrl}/uploads/theme/${special.file_nm2}`} alt="" />
                                        </picture>
                                        <div className="txt">
                                            <h4>{special.theme_nm}</h4>
                                            <p>{special.theme_con}</p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            ) : ""}
        </>
    )
}