import { useState, useEffect, useContext } from "react"
import { getStyle } from "../../../apis/style.api"
import { getBrand, changeMethod } from "../../../apis/room.api"
import { RoomInfoContext } from "@contexts/Write/RoomInfoContext"
import { WriteContext } from "@contexts/Write/WriteContext"
import { RoomDetailContext } from "@contexts/Write/RoomDetailContext"
import { useParams } from "react-router-dom"
import styles from "./Write.module.css"

export default () => {
    const { roomInfo, setRoomInfo } = useContext(RoomInfoContext)
    const { data, setData } = useContext(WriteContext)
    const [styleData, setStyleData] = useState([])
    const [inputData, setInputData] = useState(roomInfo)
    const [brandList, setBrandList] = useState([])
    const isEdit = JSON.parse(window.localStorage.getItem("isEdit"))
    const mode = window.localStorage.getItem("mode")
    const params = useParams()

    useEffect(() => {
        (async () => {
            const res = await getStyle()
            const brandRes = await getBrand()
            if (res.status == "ok") {
                setStyleData(res.response)
            }
            if (brandRes.status == "ok") {
                setBrandList(brandRes.response)
            }
            return () => { }
        })()

    }, [])

    useEffect(() => {
        setRoomInfo(inputData)
    }, [inputData])

    const handleInput = async (type, e) => {
        switch (type) {
            case "name":
                setInputData({ ...inputData, concept_room_nm: e.target.value })
                break
            case "brand":
                setInputData({ ...inputData, brand: e.target.value })
                break
            case "state":
                setInputData({ ...inputData, state: e.target.value })
                break
            case "styles":
                const value = e.target.value
                if (e.target.checked) {
                    setInputData({ ...inputData, styles: [...inputData.styles, value] })
                } else {
                    setInputData({ ...inputData, styles: inputData.styles.filter(el => el != value) })
                }
                break
            case "use":
                setInputData({ ...inputData, use_yn: e.target.value })
                break
            case "sort":
                setInputData({ ...inputData, sort: e.target.value })
                break
            case "mode":
                if (isEdit) {
                    if (e.target.value != mode) {
                        if (window.confirm("Change ?")) {
                            const res = await changeMethod(params.seq, e.target.value)
                            if(res.status == "success") {
                                setData({...roomInfo, view: res.response})
                            }
                            window.localStorage.setItem("mode", e.target.value)
                            setInputData({ ...inputData, upload_method: e.target.value })
                        }
                    }
                } else {
                    setInputData({ ...inputData, upload_method: e.target.value })
                }
                break
        }
    }



    return (
        <div className={styles.room__info__container}>
            <div className={styles.room__input__group}>
                <label className={styles.label}>컨셉룸명</label>
                <input value={inputData.concept_room_nm} onChange={(e) => handleInput("name", e)} type="text" className={styles.room__input} />
            </div>
            <div className="row">
                <div className="col-5">
                    <div className={styles.room__input__group2}>
                        <label className={styles.label}>브랜드</label>
                        <select value={inputData.brand} className={styles.input} onChange={(e) => handleInput("brand", e)}>
                            <option value=""></option>
                            {brandList && brandList.map((el, idx) => (
                                <option key={idx} value={el.code_cd2}>{el.code_nm2}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-5">
                    <div className={styles.room__input__group3}>
                        <label className={styles.label}>상태</label>
                        <select value={inputData.state} className={styles.input} onChange={(e) => handleInput("state", e)}>
                            <option value=""></option>
                            <option value="W">대기</option>
                            <option value="I">진행</option>
                            <option value="E">마감</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="mb-3 d-flex flex-column gap-4">
                    {styleData && styleData.map(el => (
                        el.detailed.length ? (
                            <div style={{ maxWidth: "100%" }} key={el.h_code} className={styles.room__input__group2}>
                                <label className={styles.label}>{el.h_name}</label>
                                <div className={styles.group__check}>
                                    {el.detailed && el.detailed.map(dt => (
                                        <label key={el.h_code + dt.d_code} className={styles.check__container}>{dt.d_name}
                                            <input
                                                checked={inputData.styles.filter(x => x == JSON.stringify({
                                                    h_code: el.h_code,
                                                    d_code: dt.d_code
                                                })).length}
                                                value={JSON.stringify({
                                                    h_code: el.h_code,
                                                    d_code: dt.d_code
                                                })}
                                                onChange={(e) => handleInput("styles", e)}
                                                type="checkbox"
                                                className={styles.checkbox} name="styles" />
                                            <span className={styles.checkmark__checkbox}></span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ) : ""
                    ))}
                </div>
            </div>
            <div className="row d-flex align-items-center">
                <div className="col-5">
                    <div className={styles.room__input__group2}>
                        <label className={styles.label}>게시여부</label>
                        <div className={styles.group__check}>
                            <label className={styles.check__container}>게시
                                <input checked={inputData.use_yn == "Y"} id="Y" value="Y" name="use" onChange={(e) => handleInput("use", e)} className={styles.radio} type="radio" />
                                <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.check__container}>미게시
                                <input checked={inputData.use_yn == "N"} value="N" id="N" name="use" onChange={(e) => handleInput("use", e)} className={styles.radio} type="radio" />
                                <span className={styles.checkmark}></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <div className={styles.room__input__group2}>
                        <label className={styles.label}>정렬순서</label>
                        <input value={inputData.sort} onChange={(e) => handleInput("sort", e)} type="text" className={styles.input} />
                        <span className={styles.sorting}>(내림차순 정렬)</span>
                    </div>
                </div>
            </div>
            <div className={styles.room__input__group2}>
                <label className={styles.label + " me-3"}>이미지 게시 방식</label>
                <div className={styles.group__check}>
                    <label className={styles.check__container}>레이어
                        <input checked={inputData.upload_method == "L"} id="L" value="L" name="method" onChange={(e) => handleInput("mode", e)} className={styles.radio} type="radio" />
                        <span className={styles.checkmark}></span>
                    </label>
                    <label className={styles.check__container}>상품 배치
                        <input checked={inputData.upload_method == "P"} value="P" id="P" name="method" onChange={(e) => handleInput("mode", e)} className={styles.radio} type="radio" />
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
            </div>
        </div>
    )
} 