import ManagerLayout from "@components/manager/ManagerLayout";
import {useState} from "react";
import {WriteProvider} from "@contexts/Write/WriteContext";
import {RoomDetailProvider} from "@contexts/Write/RoomDetailContext";
import {RoomInfoProvider} from "@contexts/Write/RoomInfoContext";
import styles from "@styles/ConceptRoomWrite.module.css";
import RoomInfo from "@components/manager/RoomInfo";
import RoomDetailContainer from "@components/manager/RoomDetailContainer";
import { deleteMultiple } from "@apis/uploadApi";
import { useNavigate } from "react-router";
import { postRoom } from "@apis/conceptRoomApi";

export default () => {
    const [selectConfig, setSelectConfig] = useState("basic")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleSelect = (e) => {
        setSelectConfig(e.target.value)
    }

    const handleDelete = async () => {
        if(window.confirm("삭제하시겠습니까?")) {
            deleteImg()
        }
    }


    const handleSave = async () => {
        try {
            const data = JSON.parse(window.localStorage.getItem("project_write"))
            if (
                data.concept_room_nm != "" &&
                data.thumbnail_img != "" &&
                data.state != "" &&
                data.brand != "" &&
                data.styles.length
            ) {
                setIsLoading(true)
                const res = await postRoom(data)
                if (res.status == "ok") {
                    alert("성공")
                    window.localStorage.removeItem("project_write")
                    navigate("/manager/concept-room/list")
                } else {
                    setIsLoading(false)
                    alert("err")
                }
            } else {
                setIsLoading(false)
                alert("다시 확인해 주세요.")
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            alert("err")
        }
    }

    const handleList = async () => {
        if(window.confirm("다시 목록으로?")) {
            deleteImg()
        }
    }

    const deleteImg = () => {
        window.localStorage.removeItem("project_write")
        window.localStorage.removeItem("current_img")
        navigate("/manager/concept-room/list")
    }

    return (
        <ManagerLayout>
            <WriteProvider>
                <div className={styles.container}>
                    <h3 className={styles.title}>컨셉룸 관리</h3>
                    <div className={styles.write__container}>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div>
                                <button onClick={handleSelect}
                                        className={selectConfig === "basic" ? styles.active__config : styles.disable__config}
                                        value="basic">기본 설정
                                </button>
                                <button onClick={handleSelect}
                                        className={selectConfig === "main" ? styles.active__config : styles.disable__config}
                                        value="main">컨셉룸 설정
                                </button>
                            </div>
                            <div className={styles.button__grp}>
                            {isLoading && <span className={styles.loading__circle}></span>}
                                <button onClick={handleSave} className={`${styles.save__btn} ${isLoading ? styles.loading_btn : ""}`}>{isLoading ? "로딩" : "저장"}</button>
                                <button onClick={handleDelete} className={styles.delete__btn}>삭제</button>
                                <button onClick={handleList} className={styles.list__btn}>목록</button>
                            </div>
                        </div>
                        <div>
                            {selectConfig === "basic" ? (
                                    <RoomInfoProvider>
                                        <RoomInfo/>
                                    </RoomInfoProvider>
                                ) :
                                <div>
                                    <RoomInfoProvider>
                                        <RoomDetailProvider>
                                            <RoomDetailContainer/>
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