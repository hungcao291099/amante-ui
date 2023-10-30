import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const WriteContext = createContext({})

export const WriteProvider = ({ children }) => {
    const exists = JSON.parse(window.localStorage.getItem("project_write"))
    const userdata = JSON.parse(window.localStorage.getItem("admin_info"))
    const navigate = useNavigate()

    if (!userdata) {
        return navigate("/manager/login", { replace: true })
    }


    const initData = {
        concept_room_nm: "",
        bg_url: "",
        thumbnail_img: "",
        use_yn: "Y",
        state: "",
        brand: "",
        sort: "",
        styles: [],
        view: [],
        upload_method: 'L',
        admin_id: userdata.login_id,
        related_room: []
    }

    const set = exists == null ? initData : exists
    const [data, setData] = useState(set)

    if (!exists) {
        window.localStorage.setItem("project_write", JSON.stringify(initData))
    }

    useEffect(() => {
        data.admin_id = userdata.login_id
        window.localStorage.setItem("project_write", JSON.stringify(data))
    }, [data])

    return (
        <WriteContext.Provider value={{ setData, data }}>
            {children}
        </WriteContext.Provider>
    )
}