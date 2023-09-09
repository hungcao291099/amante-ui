import { getProductView } from "@apis/conceptRoomApi";
import { useSearchParams } from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "@styles/ConceptRoomList.module.css";

export default () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState(undefined)

    const fetch = async () => {
        const concept_room_seq = searchParams.get("concept_room_seq");
        const result = await getProductView(concept_room_seq)
        if(result.status === "ok") {
            setData(result.response)
        }
        console.log(result)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className="my-5 mx-5">
            <table className={styles.table}>
                <thead>
                <tr>
                    <th style={{ width: "50px", whiteSpace: "nowrap" }}>번호</th>
                    <th style={{ width: "50px", whiteSpace: "nowrap" }}>위치</th>
                    <th style={{ width: "50px", whiteSpace: "nowrap" }}>자사 구분</th>
                    <th style={{ width: "90%", whiteSpace: "nowrap" }} className={styles.last__th}>상품명</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((el, idx) => (
                    (el.product_nm != "" ? (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{el.view_nm}</td>
                            <td>{el.class}</td>
                            <td style={{ textAlign: "left", paddingLeft: "5px" }} className={styles.no__border}>{el.product_nm}</td>
                        </tr>
                    ) : "")
                ))}
                </tbody>
            </table>
        </div>
    )
}