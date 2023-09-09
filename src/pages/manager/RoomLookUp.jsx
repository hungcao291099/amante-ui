import styles from "@styles/ConceptRoomList.module.css"
import {getRoomProduct} from "@apis/conceptRoomApi";
import {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export default () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const product_cd = searchParams.get("product_cd")
    const [data, setData] = useState(undefined)

    const fetch = async () => {
        console.log(product_cd)
        const result = await getRoomProduct(product_cd);
        setData(result.response);
        return () => {}
    }

    useEffect(() => {
        fetch()
    }, [])


    return (
        <div className="my-5 mx-5 d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2">
                <span className={styles.big__title}>컨셉룸 제품 조회</span>
                <span className={styles.small__title}>컨셉룸 노출 조회</span>
            </div>
            <div className={styles.room__container}>
                <div className={styles.search__form}>
                    <div className={styles.left__col}>제품명</div>
                    <div className={styles.right__col}>
                        {
                            data && (
                                <>
                                    <div className={styles.product_cd}>{data[0].product_cd}</div>
                                    <div className={styles.product_nm}>{data[0].product_nm}</div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th style={{ width: "50px", whiteSpace: "nowrap" }}>컨셉룸 번호</th>
                    <th style={{ width: "50px", whiteSpace: "nowrap" }}>노출 위치</th>
                    <th style={{ width: "90%", whiteSpace: "nowrap" }} className={styles.last__th}>컨셉룸명</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((el, idx) => (
                    <tr key={idx}>
                        <td>
                            {el.concept_room_seq}
                        </td>
                        <td>
                            {el.display}
                        </td>
                        <td className={styles.last__th} style={{ textAlign: "left", padding: "0 5px" }}>
                            {el.concept_room_nm}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}