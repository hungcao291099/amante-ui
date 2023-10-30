import ManagerLayout from "@components/manager/ManagerLayout";
import styles from "@styles/ConceptRoomWrite.module.css";
import { WriteProvider } from "@contexts/Write/WriteContext"
import { RoomInfoProvider } from "@contexts/Write/RoomInfoContext"
import { RoomDetailProvider } from "@contexts/Write/RoomDetailContext"
import RoomInfo from "@components/manager/RoomInfo"
import RoomDetailContainer from "@components/manager/RoomDetailContainer"
import { useState } from "react"
import { postUpdate, updateRoomFromList } from "@apis/conceptRoomApi"
import { useParams } from "react-router-dom"

export default () => {
    const [selectConfig, setSelectConfig] = useState("basic")
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()

    const handleSelect = (e) => {
        setSelectConfig(e.target.value)
    }

    const handleDelete = async () => {
        if (window.confirm("이것을 삭제 하시겠습니까?")) {
            const res = await updateRoomFromList({ concept_room_seq: params.seq, del_yn: 'Y' })
            if (res.status == "ok") {
                alert("삭제됨")
                window.localStorage.removeItem("project_write")
                window.localStorage.removeItem("isEdit")
                window.localStorage.removeItem("mode")
                window.location.href = "/manager/concept-room/list"
            } else {
                setIsLoading(false)
                alert("나중에 다시 시도 해주십시오.")
            }
        }
    }

    const handleSave = async () => {
        try {
            if (window.confirm("변경 사항을 적용하시겠습니까?")) {
                const data = JSON.parse(window.localStorage.getItem("project_write"))
                if (
                    data.concept_room_nm != "" &&
                    data.thumbnail_img != "" &&
                    data.state != "" &&
                    data.brand != "" &&
                    data.styles.length
                ) {
                    setIsLoading(true)
                    const res = await postUpdate(params.seq, data)
                    if (res.status === "ok") {
                        alert("성공")
                        window.localStorage.removeItem("project_write")
                        window.localStorage.removeItem("isEdit")
                        window.localStorage.removeItem("mode")
                        window.location.href = "/manager/concept-room/list"
                    } else {
                        setIsLoading(false)
                        alert("error")
                    }
                } else {
                    setIsLoading(false)
                    alert("다시 확인해 주세요.")
                }
            }
        } catch (error) {
            setIsLoading(false)
            alert("err")
        }
    }

    const handleList = () => {
        if (window.confirm("다시 목록으로 ?")) {
            window.localStorage.removeItem("isEdit")
            window.localStorage.removeItem("project_write")
            window.localStorage.removeItem("mode")
            window.localStorage.removeItem("current_img")
            window.location.href = "/manager/concept-room/list"
        }
    }

    return (
        <ManagerLayout>
            <WriteProvider>
                <div className={`${styles.container}`}>
                    <h3 className={styles.title}>컨셉룸 관리</h3>
                    <div className={styles.write__container}>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div>
                                <button onClick={handleSelect} className={selectConfig == "basic" ? styles.active__config : styles.disable__config} value="basic">기본 설정</button>
                                <button onClick={handleSelect} className={selectConfig == "main" ? styles.active__config : styles.disable__config} value="main">컨셉룸 설정</button>
                            </div>
                            <div className={styles.button__grp}>
                                {isLoading && <span className={styles.loading__circle}></span>}
                                <button onClick={handleSave} className={`${styles.save__btn} ${isLoading ? styles.loading_btn : ""}`}>{isLoading ? "로딩" : "저장"}</button>
                                <button onClick={handleDelete} className={styles.delete__btn}>삭제</button>
                                <button onClick={handleList} className={styles.list__btn}>목록</button>
                            </div>
                        </div>
                        <div>
                            {selectConfig == "basic" ? (
                                <RoomInfoProvider>
                                    <RoomInfo />
                                </RoomInfoProvider>
                            ) :
                                <div>
                                    <RoomInfoProvider>
                                        <RoomDetailProvider>
                                            <RoomDetailContainer />
                                        </RoomDetailProvider>
                                    </RoomInfoProvider>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </WriteProvider>
        </ManagerLayout>
    )
}