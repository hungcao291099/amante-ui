import { useContext, useEffect, useState } from "react"
import { RoomDetailContext } from "@contexts/Write/RoomDetailContext"
import { RoomInfoContext } from "@contexts/Write/RoomInfoContext"
import styles from "@styles/ConceptRoomWrite.module.css"
import styles2 from "./Write.module.css"
import { deleteSingle, uploadSingle, deleteMultiple } from "@apis/uploadApi";
import RoomDetail from "@components/manager/RoomDetail";

export default () => {
    const { view, setView } = useContext(RoomDetailContext)
    const { roomInfo, setRoomInfo } = useContext(RoomInfoContext)
    const [selectConfig, setSelectConfig] = useState(view.length ? view[0].view_nm : `SLIDE 0`)
    const [inputData, setInputData] = useState(roomInfo)

    const handleAddView = () => {
        const newView = {
            view_nm: `SLIDE ${view.length}`,
            slide_url: "",
            file_nm: "",
            room_object: [],
            outside_prd: [],
        }

        setView((prev) => {
            return [...prev, newView]
        })
    }

    useEffect(() => {
        setRoomInfo(inputData)
    }, [inputData])

    const handleSelect = (e) => {
        setSelectConfig(e.target.value)
    }

    const handleInput = async (type, e) => {
        try {
            switch (type) {
                case "thumb":
                    if (roomInfo.thumbnail_img != "") {
                        await deleteSingle({ file_nm: roomInfo.thumbnail_img, folder: "concept_room" })
                        setInputData({ ...inputData, thumbnail_img: "" })
                    }
                    const formdata = new FormData()
                    formdata.append("concept_room_file", e.target.files[0])
                    const res = await uploadSingle(formdata, "concept_room")
                    console.log(res)
                    if (res.status == "ok") {
                        setInputData({ ...inputData, thumbnail_img: res.response })
                    }
                    break
                case "url":
                    setInputData({ ...inputData, bg_url: e.target.value })
                    break

            }
        } catch (error) {
            alert("Not accept this file type")
        }
    }

    const handleSlideOrder = (mode) => {
        if (mode === "asc") {
            const arr = [...view]
            if (arr[arr.length - 1].view_nm !== selectConfig) {
                for (let i = 0; i < arr.length; i++) {
                    if(arr[i].view_nm == selectConfig) {
                        const temp = arr[i]
                        arr[i] = arr[i + 1]   
                        arr[i + 1] = temp
                        break
                    }
                }
            }
            setView(arr)
        }
        if (mode === "desc") {
            const arr = [...view]
            if (arr[0].view_nm !== selectConfig) {
                for (let i = 0; i < arr.length; i++) {
                    if(arr[i].view_nm == selectConfig) {
                        const temp = arr[i]
                        arr[i] = arr[i - 1]   
                        arr[i - 1] = temp
                        break
                    }
                }
            }
            setView(arr)
        }

    }

    const handleDeleteSlide = async () => {
        if (window.confirm("이 슬라이드를 삭제하시겠습니까?")) {
            const deleteImg = []
            const deleteImg2 = []
            for (const v of view) {
                if (v.file_nm != "") {
                    deleteImg.push(v.file_nm);
                    for (const ro of v.room_object) {
                        if (ro.thumbnail_img != "") {
                            deleteImg.push(ro.thumbnail_img)
                        }
                        for (const opt of ro.options) {
                            if (opt.thumbnail_img != "") {
                                deleteImg.push(opt.thumbnail_img)
                            }

                            if (opt.option_file_nm != "") {
                                deleteImg2.push(opt.option_file_nm)
                            }
                        }
                    }
                }
            }
            await Promise.all([
                await deleteMultiple({ folder: "concept_room", files: JSON.stringify(deleteImg) }),
                await deleteMultiple({ folder: "concept_room/object", files: JSON.stringify(deleteImg2) })
            ])
            const arr = view.filter(v => v.view_nm !== selectConfig);
            setView(arr.map((v, idx) => {
                return {
                    ...v,
                    view_nm: `SLIDE ${idx}`
                }
            }))
        }
    }

    return (
        <div className="d-flex flex-column gap-4">
            <div className={styles2.room__input__group}>
                <label style={{ minWidth: "200px" }} className={styles2.label}>컨셉룸 시작 영상</label>
                <input onChange={(e) => handleInput("url", e)} placeholder="영상 링크" type="text" value={inputData.bg_url} className={styles2.input} />
            </div>
            <div className="d-flex align-items-center gap-3">
                <div className={styles2.room__input__group} style={{ width: "94%" }}>
                    <label style={{ minWidth: "200px" }} className={styles2.label}>메인 썸네일 이미지</label>
                    <input readOnly value={inputData.thumbnail_img} placeholder="파일선택" type="text" className={styles2.input} />
                </div>
                <label className={styles.file__label}>
                    <input onChange={(e) => handleInput("thumb", e)} className={styles.file__input} type="file" />
                    <span className={styles.save__btn}>찾아보기</span>
                </label>
            </div>
            <div>
                {view.length ? (
                    <div className={styles.slide__btn__group}>
                        <button onClick={() => handleSlideOrder('desc')} className={styles.order__btn}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button onClick={() => handleSlideOrder('asc')} className={styles.order__btn}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                        <button onClick={handleDeleteSlide} className={styles.save__btn}>삭제</button>
                    </div>
                ) : ""}
                <div className="d-flex">
                    {view && view.map(el => (
                        <button
                            key={el.view_nm}
                            onClick={handleSelect}
                            className={selectConfig == el.view_nm ? styles.active__config : styles.disable__config}
                            value={el.view_nm}>{el.view_nm}</button>
                    ))}
                    <button onClick={handleAddView} className={styles.disable__config}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div>
                    {view && view.map((el, idx) => (
                        selectConfig == el.view_nm ? <RoomDetail selectedView={selectConfig} mode={roomInfo.upload_method} data={el} key={idx} /> : ""
                    ))}
                </div>
            </div>
        </div>
    )
}