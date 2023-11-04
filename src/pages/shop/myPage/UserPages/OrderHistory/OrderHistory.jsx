import styles from "./OrderHistory.module.css"
import { useContext } from 'react';
import { CdnContext } from '@contexts/cdnContext';
import { AiOutlineDown } from "react-icons/ai";
const OrderHistory =() =>{
    const { baseUrl } = useContext(CdnContext);
    return(
        <div className={styles.wrap}>
            <div className={styles.product_block}>
                <div className={styles.product_block_title}>
                    <p>주문번호: <span> 20230519163911209BIX</span></p>
                    <input type="button" value="문의하기" />
                </div>
                <div className={styles.product_container}>
                    <div className={styles.items}>
                        <div className={styles.item_img}><img src={baseUrl + `/uploads/product/285/a323782787408fd32b9c485c054596bc.jpg`} alt="" /></div>
                        <div className={styles.item_detail}>
                            <p className={styles.item_nm}>세이프가드 소프트 알러지케어 방수 매트리스커버 8color</p>
                            <p className={styles.item_props}>색상 : 시티그레이 , 사이즈 : SS(조합옵션비 : +5,000원)  1개</p>
                            <p className={styles.item_price}>14,900원</p>
                        </div>
                    </div>
                    <div className={styles.items}>
                        <div className={styles.item_img}><img src={baseUrl + `/uploads/product/285/a323782787408fd32b9c485c054596bc.jpg`} alt="" /></div>
                        <div className={styles.item_detail}>
                            <p className={styles.item_nm}>세이프가드 소프트 알러지케어 방수 매트리스커버 8color</p>
                            <p className={styles.item_props}>색상 : 시티그레이 , 사이즈 : SS(조합옵션비 : +5,000원)  1개</p>
                            <p className={styles.item_price}>14,900원</p>
                        </div>
                    </div>
                    <div className={styles.items}>
                        <div className={styles.item_img}><img src={baseUrl + `/uploads/product/285/a323782787408fd32b9c485c054596bc.jpg`} alt="" /></div>
                        <div className={styles.item_detail}>
                            <p className={styles.item_nm}>세이프가드 소프트 알러지케어 방수 매트리스커버 8color</p>
                            <p className={styles.item_props}>색상 : 시티그레이 , 사이즈 : SS(조합옵션비 : +5,000원)  1개</p>
                            <p className={styles.item_price}>14,900원</p>
                        </div>
                    </div>
                    <div className={styles.items}>
                        <div className={styles.item_img}><img src={baseUrl + `/uploads/product/285/a323782787408fd32b9c485c054596bc.jpg`} alt="" /></div>
                        <div className={styles.item_detail}>
                            <p className={styles.item_nm}>세이프가드 소프트 알러지케어 방수 매트리스커버 8color</p>
                            <p className={styles.item_props}>색상 : 시티그레이 , 사이즈 : SS(조합옵션비 : +5,000원)  1개</p>
                            <p className={styles.item_price}>14,900원</p>
                        </div>
                    </div>
                    <div className={styles.items}>
                        <div className={styles.item_img}><img src={baseUrl + `/uploads/product/285/a323782787408fd32b9c485c054596bc.jpg`} alt="" /></div>
                        <div className={styles.item_detail}>
                            <p className={styles.item_nm}>세이프가드 소프트 알러지케어 방수 매트리스커버 8color</p>
                            <p className={styles.item_props}>색상 : 시티그레이 , 사이즈 : SS(조합옵션비 : +5,000원)  1개</p>
                            <p className={styles.item_price}>14,900원</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.info_block}>
            <div className={styles.shipping_block}>
                <div className={styles.shipping_title}>
                <p>배송 정보</p>
                <AiOutlineDown/>
                </div>
                <div className={styles.shipping_container}>
                    <table className={styles.table_shipping}>
                        <tr>
                            <td>받으실분</td>
                            <td>김연아</td>
                        </tr>
                        <tr>
                            <td>우편번호</td>
                            <td>10891</td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td>경기 파주시 교하로 100 (목동동, 힐스테이트 운정) 906-205</td>
                        </tr>
                        <tr>
                            <td>연락처1</td>
                            <td>010-4238-6454</td>
                        </tr>
                        <tr>
                            <td>연락처2</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>주문메세지</td>
                            <td>문앞에 놔주세요(#205#0225)</td>
                        </tr>
                    </table>
                    <div className={styles.btn_container}>
                    <input className={styles.btn_cancel} type="button" value="재구매" />
                    <input className={styles.btn_submit} type="button" value="주문취소" />
                </div>
                </div>
                
            </div>
            <div className={styles.payment_block}>
            <div className={styles.shipping_title}>
                <p>주문/결제 정보</p>
                <AiOutlineDown/>
                </div>
                <table className={styles.table_payment}>
                    <tr>
                        <td>주문일자</td>
                        <td>2023.05.19</td>
                    </tr>
                    <tr>
                        <td>총상품금액</td>
                        <td>44,700원 (배송비: 3,500원)</td>
                    </tr>
                    <tr>
                        <td>쿠폰할인</td>
                        <td>4,470원</td>
                    </tr>
                    <tr>
                        <td>적립금 사용</td>
                        <td>0원</td>
                    </tr>
                    <tr>
                        <td>실결제금액</td>
                        <td>43,730원</td>
                    </tr>
                    <tr>
                        <td>결제방식</td>
                        <td>네이버페이</td>
                    </tr>
                </table>
               
            </div>
            </div>
            
            
        </div>
    )
}
export default OrderHistory