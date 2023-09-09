import ManagerLayout from "@components/manager/ManagerLayout";
import styles from "@styles/ConceptRoom.module.css";
import styles2 from "@styles/ConceptRoomList.module.css";
import {useState, useEffect} from "react";
import {getAllCdn, updateCdn} from "@apis/cdn";

export default () => {
    const [service, setService] = useState(undefined);

    const fetch = async () => {
        const cdn = await getAllCdn();
        setService(cdn[0].service_div);
    }

    useEffect(() => {
        fetch()
    }, [])

    const handleCheck = (e) => {
        setService(e.target.value)
    }

    const handleChange = async () => {
        const response = await updateCdn(service)
        if(response.status === "ok") {
            alert("OK")
        }
    }


    return (
        <ManagerLayout>
            <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-2">
                    <span className={styles.big__title}>체계</span>
                    <span className={styles.small__title}>CDN 구성</span>
                </div>
                <div className="d-flex gap-5 w-100">
                    <div className="d-flex gap-2 align-items-center">
                        <label htmlFor="radio_1">베트남만</label>
                        <input onChange={handleCheck} checked={service == "1"} id="radio_1" value="1" name="accept" type="radio"/>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        <label htmlFor="radio_2">모두 가까이</label>
                        <input onChange={handleCheck} checked={service == "2"} id="radio_2" type="radio" value="2" name="accept"/>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        <label htmlFor="radio_3">모두 열려</label>
                        <input onChange={handleCheck} checked={service == "3"} id="radio_3" type="radio" value="3" name="accept"/>
                    </div>
                    <button onClick={handleChange} className={styles2.active__btn}>
                        등록
                    </button>
                </div>
            </div>
        </ManagerLayout>
    )
}