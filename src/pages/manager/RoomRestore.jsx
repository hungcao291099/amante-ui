import { useEffect, useState } from 'react'
import { getDelRoom, updateRoomFromList } from "@apis/conceptRoomApi"
import styles from "@styles/ConceptRoomList.module.css"

function RoomRestore() {
    const [data, setData] = useState()

    const fetch = async () => {
        const response = await getDelRoom()
        setData(response.list)
        return () => { }
    }

    useEffect(() => {
        fetch()
    }, [])

    const handleRestore = async (concept_room_seq) => {
        if(window.confirm("이것을 복원하시겠습니까?")) {
            const response = await updateRoomFromList({concept_room_seq, del_yn: 'N'})
            if(response.status === "ok") {
                setData(data.filter(el => el.concept_room_seq !== concept_room_seq))
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.table__container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ width: "64px" }} className={styles.no__border}>번호</th>
                            <th>컨셉룸명</th>
                            <th style={{ width: "200px" }} className={styles.last__th}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((room, idx) => (
                            <tr>
                                <td>{room.concept_room_seq}</td>
                                <td style={{
                                    textAlign: "left"
                                }} className='px-3'>{room.concept_room_nm}</td>
                                <td>
                                    <button
                                        onClick={() => handleRestore(room.concept_room_seq)}
                                        className={`${styles.active__btn} w-100`}>복원하다
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RoomRestore