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
            await deleteImg()
        }
    }


    const handleSave = async () => {
        try {
            const data = JSON.parse(window.localStorage.getItem("project_write"))
            if (
                data.concept_room_nm != "" &&
                data.bg_url != "" &&
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
                }
            } else {
                alert("다시 확인해 주세요.")
            }
        } catch (error) {
            console.log(error)
            alert("err")
        }
    }

    const handleList = async () => {
        if(window.confirm("다시 목록으로?")) {
            await deleteImg()
        }
    }

    const deleteImg = async () => {
        const data = JSON.parse(window.localStorage.getItem("project_write"))
        const arr = []
        const arr2 = []
        if (data) {
            data.thumbnail_img != "" && arr.push(data.thumbnail_img)
            data.view && data.view.map(el => {
                el.file_nm != "" && arr.push(el.file_nm)
                el.room_object && el.room_object.map(el2 => {
                    el2.thumbnail_img != "" && arr.push(el2.thumbnail_img)
                    el2.options && el2.options.map(el3 => {
                        el3.thumbnail_img != "" && arr.push(el3.thumbnail_img)
                        el3.option_file_nm != "" && arr2.push(el3.option_file_nm)
                    })
                })
            })
        }
        const promise_1 = deleteMultiple({ folder: "concept_room", files: JSON.stringify(arr) })
        const promise_2 = deleteMultiple({ folder: "concept_room/object", files: JSON.stringify(arr2) })
        await Promise.all([promise_1, promise_2])
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