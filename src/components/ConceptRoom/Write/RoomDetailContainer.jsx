import { useContext, useEffect, useState } from "react"
import { RoomDetailContext } from "@contexts/Write/RoomDetailContext"
import { RoomInfoContext } from "@contexts/Write/RoomInfoContext"
import RoomDetail from "./RoomDetail"
import styles from "@styles/ConceptRoomWrite.module.css"
import styles2 from "@components/ConceptRoom/Write/Write.module.css"
import { deleteSingle, uploadSingle } from "@apis/upload.api"

export default () => {
    const { view, setView } = useContext(RoomDetailContext)
    const { roomInfo, setRoomInfo } = useContext(RoomInfoContext)
    const [selectConfig, setSelectConfig] = useState(view.length ? view[0].view_nm : `SLIDE 0`)
    const [inputData, setInputData] = useState(roomInfo)

    const handleAddView = () => {
        const newView = {
            view_nm: `SLIDE ${view.length}`,
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
                    formdata.append("image", e.target.files[0])
                    const res = await uploadSingle(formdata, "concept_room")
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

    return (
        <>
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
                    <div>
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
        </>
    )
}