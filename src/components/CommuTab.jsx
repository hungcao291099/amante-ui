import React from 'react'


const CommuTab = ({data}) => {
    const pathname = window.location.pathname;
    const lastPart = pathname.split("/").pop();

    return (
        <>
                <div className="commu_tab">
                    <ul>
                        <li className={lastPart == 'review_lists' ? 'on':''}><a href={`/shop/review/review_lists`}>상품후기</a></li>
                        <li className={lastPart == 'housewarming_lists' || lastPart == 'housewarming_view'? 'on':''}><a href={`/shop/housewarming/housewarming_lists`}>아망떼 집들이</a></li>
                        <li className={lastPart == 'tip_lists' || lastPart == 'tip_view' ? 'on':''}><a href={`/shop/tip/tip_lists`}>구매가이드</a></li>
                        <li className={lastPart == 'wedding_event_list' || lastPart == 'wedding_event_view' ? 'on':''}><a href={`/shop/event/promotion_view?no=20`}>웨딩쿠폰</a></li>
                        <li className={lastPart == 'proposal' ? 'on':''}><a href={`/shop/event/promotion_view?no=21`}>아망떼에 바란다</a></li>
                        <li className={lastPart == 'benefit' ? 'on':''}><a href={`/shop/community/benefit`} target="_blink">회원혜택</a></li>
                        <li className={lastPart == 'sponsorship_list' ? 'on':''}><a href={`/shop/community/sponsorship_list`}>협찬</a></li>
                        <li className={lastPart == 'inquiry' ? 'on':''}><a href={`/shop/community/inquiry/inquiry`}>대량구매/제휴/입점</a></li>
                    </ul>
                </div>
        </>
    )
}

export default CommuTab