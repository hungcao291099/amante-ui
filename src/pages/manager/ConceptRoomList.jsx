import styles from "@styles/ConceptRoomList.module.css"
import { useEffect, useState } from "react"
import ManagerLayout from "@components/manager/ManagerLayout";
import { getBrand, getRooms, updateRoomFromList, getEditRoom } from "@apis/conceptRoomApi";
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { truncate } from "@utils/functions";
import Paginate from "@components/Paginate/Paginate";

export default () => {
    const [brand, setBrand] = useState(undefined)
    const [rooms, setRooms] = useState(undefined)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const [search, setSearch] = useState({ key: "concept_room_nm", value: "" })
    window.localStorage.removeItem("project_write");
    window.localStorage.removeItem("isEdit");
    window.localStorage.removeItem("mode");
    const fetch = async () => {
        const response = await Promise.all([
            await getBrand(),
            await getRooms(searchParams)
        ])
        setBrand(response[0]);
        setRooms(response[1]);
        return () => {
        }
    }

    useEffect(() => {
        fetch()
    }, [searchParams])

    const handleSearch = (type, e) => {
        if (type === "brand") {
            setSearchParams({ ...searchParams, brand_cd: e.target.value })
        }
        if (type === "use") {
            setSearchParams({ ...searchParams, use_yn: e.target.value })
        }
    }

    const handleSearchValue = () => {
        const temp = {}
        temp[`${search.key}`] = search.value
        setSearchParams({ ...searchParams, ...temp })
    }

    const handleReset = () => {
        setSearch({ key: "concept_room_nm", value: "" })
        setSearchParams({ ...searchParams, brand: "", use_yn: "Y" })
    }

    const handleNew = () => {
        navigate("/manager/concept-room/write");
    }

    const handleUse = async (concept_room_seq, e) => {
        const use_yn = e.target.textContent === "O" ? "N" : "Y";
        const result = await updateRoomFromList({ concept_room_seq, use_yn });
        if (result.status === "ok") {
            e.target.textContent = use_yn === "N" ? "X" : "O"
        }
    }

    const handleDelete = async (concept_room_seq) => {
        if (window.confirm("이것을 삭제하시겠습니까?")) {
            const result = await updateRoomFromList({ concept_room_seq, del_yn: "Y" });
            if (result.status === "ok") {
                setRooms({
                    ...rooms,
                    list: rooms.list.filter(room => room.concept_room_seq !== concept_room_seq)
                })
            }
        }
    }

    const handleProductView = (concept_room_seq) => {
        const height = window.screen.availHeight;
        const width = window.screen.availWidth;
        const popup = window.open(`/manager/product-view?concept_room_seq=${concept_room_seq}`, '_blank', `height=${height},width=${width}`)
        popup.document.title = "아망떼 | 관리자 페이지"
    }

    const handleEdit = async (id) => {
        if (window.confirm("편집 ?")) {
            const res = await getEditRoom(id)
            if (res.status == "success") {
                window.localStorage.setItem("project_write", JSON.stringify(res.response))
                window.localStorage.setItem("mode", res.response.upload_method)
                window.localStorage.setItem("isEdit", "true")
                window.location.href = `/manager/concept-room/edit/${id}`
            } else {
                alert("Error ! Please Try Again Later")
            }
        }
    }

    return (
        <ManagerLayout>
            <div className={styles.container}>
                <span className={styles.title}>컨셉룸 관리</span>
                <div className={styles.room__container}>
                    <div className={styles.search__form}>
                        <div className={styles.left__col}>검색조건</div>
                        <div className={styles.right__col}>
                            <select onChange={(e) => handleSearch("brand", e)} value={searchParams.brand}
                                className={styles.select}>
                                <option value="">브랜드선택</option>
                                {brand && brand.map((el, idx) => (
                                    <option key={idx} value={el.code_cd2}>{el.code_nm2}</option>
                                ))}
                            </select>
                            <select onChange={(e) => handleSearch("use", e)} value={searchParams.use_yn}
                                className={styles.select}>
                                <option value="Y">사용유무</option>
                                <option value="Y">게시</option>
                                <option value="N">미게시</option>
                            </select>
                            <select value={search.key} onChange={(e) => setSearch({ ...search, key: e.target.value })}
                                className={styles.select}>
                                <option value="concept_room_nm">컨셉룸명</option>
                                <option value="style">구분</option>
                            </select>
                            <input onChange={(e) => setSearch({ ...search, value: e.target.value })} type="text"
                                className={styles.input__text} />
                            <div className={styles.input__group}>
                                <button onClick={handleSearchValue} className={styles.active__btn}>검색</button>
                                <button onClick={handleReset} className={styles.disable__btn}>목록</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.table__container}>
                        <div className="d-flex justify-content-end">
                            <button onClick={handleNew} className={styles.active__btn}>등록</button>
                        </div>
                        <span className={styles.status}>검색결과 {rooms && rooms.total} 건 ({rooms && rooms.currentPage} Page / {rooms && rooms.totalPage})</span>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: "64px" }} className={styles.no__border}>번호</th>
                                    <th>컨셉룸명</th>
                                    <th style={{ width: "102px" }}>브랜드</th>
                                    <th style={{ width: "400px" }}>구분</th>
                                    <th style={{ width: "50px" }}>상품수</th>
                                    <th style={{ width: "80px" }}>등록일</th>
                                    <th style={{ width: "58px" }}>게시</th>
                                    <th style={{ width: "58px" }}>댓글</th>
                                    <th style={{ width: "58px" }}>조회</th>
                                    <th style={{ width: "58px" }}>정렬</th>
                                    <th style={{ width: "251px" }} className={styles.last__th}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms && rooms.list.map((el, idx) => (
                                    <tr key={idx}>
                                        <td className={styles.no__border}>{el.concept_room_seq}</td>
                                        <td style={{ textAlign: "left" }}>{truncate(el.concept_room_nm, 65)}</td>
                                        <td>{el.brand_nm}</td>
                                        <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>{truncate(el.style, 35)}</td>
                                        <td>{`${el.product_cnt}건`}</td>
                                        <td>{el.reg_date}</td>
                                        <td onClick={(e) => handleUse(el.concept_room_seq, e)}
                                            className={styles.use__yn}>{el.use_yn}</td>
                                        <td>{el.cmt_cnt}</td>
                                        <td>{el.vw_cnt}</td>
                                        <td>{el.sort}</td>
                                        <td className={`${styles.no__border} ${styles.btn__group}`}>
                                            <div className={styles.btn__box}>
                                                <button onClick={() => handleEdit(el.concept_room_seq)}
                                                    className={styles.active__btn}>수정
                                                </button>
                                                <button onClick={() => handleDelete(el.concept_room_seq)}
                                                    className={styles.delete__btn}>삭제
                                                </button>
                                                <button onClick={() => handleProductView(el.concept_room_seq)}
                                                    style={{ padding: "0 11px" }} className={styles.list__btn}>상품 보기
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Paginate
                    totalPage={rooms && rooms.totalPage || 0}
                    rowCount={rooms && rooms.itemPerPage || 0}
                    currentPage={rooms && rooms.currentPage || 0}
                    totalItem={rooms && rooms.total || 0}
                />
            </div>
        </ManagerLayout>
    )
}