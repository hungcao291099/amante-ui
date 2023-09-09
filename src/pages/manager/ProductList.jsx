import ManagerLayout from "@components/manager/ManagerLayout";
import styles from "@styles/ConceptRoomList.module.css";
import { getBrand, getProductRoomList } from "@apis/conceptRoomApi";
import {useEffect, useState} from "react";
import Paginate from "@components/Paginate/Paginate";
import {useSearchParams} from "react-router-dom";

export default () => {
    const [brand, setBrand] = useState(undefined)
    const [product, setProduct] = useState(undefined)
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState({
        key: "product_nm",
        value: ""
    })
    const fetch = async (query) => {
        const response = await Promise.all([
            await getBrand(),
            await getProductRoomList(query)
        ])
        setBrand(response[0])
        setProduct(response[1].response)
    }

    useEffect(() => {
        fetch(searchParams)
    }, [searchParams])

    const handleConceptRoomView = (product_cd) => {
        const height = window.screen.availHeight;
        const width = window.screen.availWidth;
        const popup = window.open(`/manager/room-lookup/list?product_cd=${product_cd}`, '_blank', `height=${height},width=${width}`)
        popup.document.title = "아망떼 | 관리자 페이지"
    }

    const handleSearch = () => {
        const params = {};
        params[search.key] = search.value;
        setSearchParams({...searchParams, ...params})
    }

    const handleReset = () => {
        setSearch({
            value: "",
            key: "product_nm"
        })
        setSearchParams({})
    }

    return (
        <ManagerLayout>
            <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-2">
                    <span className={styles.big__title}>컨셉룸 관리</span>
                    <span className={styles.small__title}>컨셉룸 제품 조회</span>
                </div>
                <div className={styles.room__container}>
                    <div className={styles.search__form}>
                        <div className={styles.left__col}>검색조건</div>
                        <div className={styles.right__col}>
                            <select onChange={(e) => setSearchParams({...searchParams, brand_cd: e.target.value})} className={styles.select}>
                                <option value="">브랜드선택</option>
                                {brand && brand.map((el, idx) => (
                                    <option key={idx} value={el.code_cd2}>{el.code_nm2}</option>
                                ))}
                            </select>
                            <select value={search.key} onChange={(e) => setSearch({...search, key: e.target.value})} className={styles.select}>
                                <option value="product_nm">제품명</option>
                                <option value="product_cd">제품 코드</option>
                            </select>
                            <input type="text" value={search.value} onChange={(e) => setSearch({...search, value: e.target.value})} className={styles.input__text} />
                            <div className={styles.input__group}>
                                <button onClick={handleSearch} className={styles.active__btn}>검색</button>
                                <button onClick={handleReset} className={styles.disable__btn}>목록</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.table__container}>
                        <span className={styles.status}>검색결과 {product && product.total} 건 ({product && product.currentPage} Page / {product && product.totalPage})</span>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th style={{ width: "30px" }}>순번</th>
                                <th style={{ width: "60px" }}>상품코드</th>
                                <th style={{ width: "30px" }}>노출 횟수</th>
                                <th style={{ width: "30px" }}>자사 구분</th>
                                <th style={{ width: "351px" }}>제품명</th>
                                <th style={{ width: "30px" }}>컨셉룸 보기</th>
                                <th style={{ width: "200px" }} className={styles.last__th}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {product && product.list.map((el, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{el.product_cd}</td>
                                    <td>{el.cnt}건</td>
                                    <td>{el.brand_nm}</td>
                                    <td style={{textAlign: "left", padding: "0 5px"}}>{el.product_nm}</td>
                                    <td>
                                        <button onClick={() => handleConceptRoomView(el.product_cd)} className={styles.list__btn}>컨셉룸 보기</button>
                                    </td>
                                    <td className={styles.last__th}></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Paginate
                    totalPage={product && product.totalPage}
                    rowCount={product && product.itemPerPage}
                    currentPage={product && product.currentPage}
                    totalItem={product && product.total}
                />
            </div>
        </ManagerLayout>
    )
}