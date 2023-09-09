import { specialProductListApi } from "@apis/specialProductListApi"
import { useState, useEffect, useContext } from "react"
import { formatNumber } from "@utils/functions"
import { useNavigate } from "react-router"
import Slider from "react-slick"
import { CdnContext } from "@contexts/cdnContext"
import DOMPurify from "dompurify"
import { Link } from "react-router-dom"

export default () => {
    const [data, setData] = useState(undefined)
    const navigate = useNavigate()
    const [mouseMoved, setMouseMoved] = useState(true)
    const [showTab, setShowTab] = useState(undefined)
    const [selectedTab, setSelectedTab] = useState("ongoing")
    const { baseUrl } = useContext(CdnContext)

    const fetchSpecial = async () => {
        const result = await specialProductListApi()
        setData(result)
        setShowTab(result.ing_promotion)
        return () => { }
    }

    useEffect(() => {
        if (data) {
            if (selectedTab == "ongoing") setShowTab(data.ing_promotion)
            if (selectedTab == "end") setShowTab(data.end_promotion)
            if (selectedTab == "winner") setShowTab(data.winner_list)
        }
    }, [selectedTab])

    useEffect(() => {
        fetchSpecial()
    }, [])

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

    return (
        <>
            {data ? (
                <div className="content special special_product_lists_page">
                    <div className="inner">
                        <div className="special_list first">
                            <ul className="list" id="product_ul">
                                {data.special_list_top && data.special_list_top.map((special, idx) => (
                                    <li key={idx}>
                                        <a href={`/shop/special/special_product_view?seq=${special.theme_seq}`}>
                                            <div className="img">
                                                <picture>
                                                    <source srcSet={`${baseUrl}/uploads/theme/${special.file_nm1}`} media="(max-width:767px)" />
                                                    <source srcSet={`${baseUrl}/uploads/theme/${special.file_nm1}`} media="(min-width:768px)" />
                                                    <img src={`${baseUrl}/uploads/theme/${special.file_nm1}`} alt="" />
                                                </picture>
                                            </div>
                                        </a>
                                        <div className="info">
                                            <p className="tit">
                                                <a href={`/shop/special/special_product_view?seq=${special.theme_seq}`}>
                                                    <strong dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(special.theme_nm)
                                                    }}></strong>
                                                    <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(special.theme_con) }}></span>
                                                </a>
                                            </p>
                                            <p className="year">
                                                {special.s_date.substring(2).replace(/-/g, '.')} - {special.e_date.substring(2).replace(/-/g, '.')}
                                            </p>
                                            <ul className="item_list">
                                                {special.top_product_list && special.top_product_list.map((product, idx2) => (
                                                    <li key={idx2}>
                                                        <div className="box">
                                                            <div className="img">
                                                                <a href={`/shop/product/product_view?product_cd=${product.product_cd}`}>
                                                                    <img src={`${baseUrl}/uploads/product/95/${product.product_main_img}`} alt="" />
                                                                </a>
                                                            </div>
                                                            <div className="txt">
                                                                <a href={`/shop/special/special_product_view?seq=${special.theme_seq}`}>
                                                                    <p className="item_tit" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.product_nm) }}></p>
                                                                </a>
                                                                <p className="price_box">
                                                                    {product.sale_price != product.supply_price ?
                                                                        <>
                                                                            <span className="percent">{product.fee_rate}%</span>
                                                                            <span className="price">{formatNumber(product.sale_price)}원</span>
                                                                            <span className="del_price">{formatNumber(product.supply_price)}원</span>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <span className="price">{formatNumber(product.sale_price)}원</span>
                                                                        </>
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div class="list_more">
                                                <Link className="btn" to={`/shop/special/special_product_view?seq=${special.theme_seq}`}>더 보기</Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="middle_banner">
                            <Slider {...keyvisual}>
                                {data.mid_banner && data.mid_banner.map((banner, idx) => (
                                    <div key={idx} className="slide">
                                        <div
                                            onMouseMove={() => setMouseMoved(true)}
                                            onMouseDown={() => setMouseMoved(false)}
                                            onClick={() => {
                                                if (!mouseMoved) {
                                                    navigate(banner.link)
                                                }
                                            }}
                                        >
                                            <div className="img">
                                                <picture>
                                                    <source srcSet={`${baseUrl}/uploads/banner/${banner.file_nm2}`} media="(max-width:767px)" />
                                                    <source srcSet={`${baseUrl}/uploads/banner/${banner.file_nm1}`} media="(min-width:768px)" />
                                                    <img src={`${baseUrl}/uploads/banner/${banner.file_nm1}`} alt="" />
                                                </picture>
                                            </div>
                                            <div className="txt">
                                                <div className="t"><div className="tc">
                                                    <p className="sub_tit">{banner.content_text1}</p>
                                                    <p className="main_tit">{banner.content_text2}</p>
                                                </div></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        <div className="event_lists js_tab">
                            <ul className="js_tabBtn">
                                <li className={selectedTab == "ongoing" ? "on" : ""}>
                                    <button onClick={() => setSelectedTab("ongoing")} type="button">진행 중인 이벤트</button>
                                </li>
                                <li className={selectedTab == "end" ? "on" : ""}>
                                    <button onClick={() => setSelectedTab("end")} type="button">마감 된 이벤트</button>
                                </li>
                                <li className={selectedTab == "winner" ? "on" : ""}>
                                    <button onClick={() => setSelectedTab("winner")} type="button">당첨자 발표</button>
                                </li>
                            </ul>
                            <ul className={selectedTab == "ongoing" ? "js_tabCon on" : selectedTab == "end" ? "js_tabCon end_lists on" : "js_tabCon winner on"}>
                                {selectedTab == "ongoing" ?
                                    (
                                        <>
                                            {showTab && showTab.map((ing, idx) => (
                                                <li key={idx} className="promotion_list">
                                                    <picture>
                                                        <a href={ing.link_url ? ing.link_url : `/shop/event/promotion_view?no=${ing.event_seq}`}>
                                                            <source srcSet={`${baseUrl}/uploads/event/${ing.file_nm1}`} media="(min-width:768px)" />
                                                            <source srcSet={`${baseUrl}/uploads/event/${ing.file_nm1}`} media="(max-width:767px)" />
                                                            <img src={`${baseUrl}/uploads/event/${ing.file_nm1}`} alt="" />
                                                        </a>
                                                    </picture>
                                                    <div className="promotion_con">
                                                        <p className="tit">
                                                            <a href={ing.link_url ? ing.link_url : `/shop/event/promotion_view?no=${ing.event_seq}`}>
                                                                {ing.event_nm}
                                                            </a>
                                                        </p>
                                                        <p className="txt">
                                                            {ing.event_con}
                                                        </p>
                                                        <p className="date">
                                                            {ing.s_date.substring(2).replace(/-/g, '.') == "00.00.00" ? "" : ing.s_date.substring(2).replace(/-/g, '.') + " - "}
                                                            {ing.e_date.substring(2).replace(/-/g, '.') == "00.00.00" ? "" : ing.e_date.substring(2).replace(/-/g, '.')}
                                                        </p>
                                                        <a href={ing.link_url ? ing.link_url : `/shop/event/promotion_view?no=${ing.event_seq}`} className="view_link">더 보기</a>
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                    ) :
                                    selectedTab == "end" ?
                                        (
                                            <>
                                                {showTab && showTab.map((end, idx) => (
                                                    <li key={idx} className="promotion_list">
                                                        <picture>
                                                            <a href={`/shop/event/promotion_view?no=${end.event_seq}`}>
                                                                <source srcSet={`${baseUrl}/uploads/event/${end.file_nm1}`} media="(min-width:768px)" />
                                                                <source srcSet={`${baseUrl}/uploads/event/${end.file_nm1}`} media="(max-width:767px)" />
                                                                <img src={`${baseUrl}/uploads/event/${end.file_nm1}`} alt="" />
                                                            </a>
                                                        </picture>
                                                        <div className="promotion_con">
                                                            <p className="tit">
                                                                <a href={`/shop/event/promotion_view?no=${end.event_seq}`}>{end.event_nm}</a>
                                                            </p>
                                                            <p className="txt">
                                                                {end.event_con}
                                                            </p>
                                                            <p className="date">
                                                                {end.s_date.substring(2).replace(/-/g, '.') == "00.00.00" ? "" : end.s_date.substring(2).replace(/-/g, '.') + " - "}
                                                                {end.e_date.substring(2).replace(/-/g, '.') == "00.00.00" ? "" : end.e_date.substring(2).replace(/-/g, '.')}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}

                                            </>
                                        ) :
                                        (
                                            <>
                                                {showTab && showTab.map((winner, idx) => (
                                                    <li key={idx} className="promotion_list">
                                                        <picture>
                                                            <a href={`/shop/event/winner_view?no=${winner.event_after_seq}`}>
                                                                <source srcSet={`${baseUrl}/uploads/event/${winner.file_nm1}`} media="(min-width:768px)" />
                                                                <source srcSet={`${baseUrl}/uploads/event/${winner.file_nm1}`} media="(max-width:767px)" />
                                                                <img src={`${baseUrl}/uploads/event/${winner.file_nm1}`} alt="" />
                                                            </a>
                                                        </picture>
                                                        <div className="promotion_con">
                                                            <p className="tit"><a href={`/shop/event/winner_view?no=${winner.event_after_seq}`}>{winner.title}</a></p>
                                                            <p className="txt">{winner.event_con}</p>
                                                            <p className="date">
                                                                {winner.s_date == "00.00.00" ? "" : winner.s_date + " - "}
                                                                {winner.e_date == "00.00.00" ? "" : winner.e_date}
                                                            </p>
                                                            <a href={`/shop/event/winner_view?no=${winner.event_after_seq}`} className="view_link">더 보기</a>
                                                        </div>
                                                    </li>
                                                ))}
                                            </>
                                        )}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : ""}
        </>
    )
}