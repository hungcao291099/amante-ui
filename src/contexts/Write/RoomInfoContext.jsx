import { createContext, useContext, useState, useEffect } from "react"
import { WriteContext } from "./WriteContext"

export const RoomInfoContext = createContext({})

export const RoomInfoProvider = ({ children }) => {
    const { setData } = useContext(WriteContext)
    const data = JSON.parse(window.localStorage.getItem("project_write"))

    const setRoom = {
        concept_room_nm: data ? data.concept_room_nm : "",
        bg_url: data ? data.bg_url : "",
        thumbnail_img: data ? data.thumbnail_img : "",
        use_yn: data ? data.use_yn : "Y",
        styles: data ? data.styles : "",
        brand: data ? data.brand : "",
        sort: data ? data.sort : "",
        state: data ? data.state : "",
        upload_method: data ? data.upload_method : 'L',
        related_room: data ? data.related_room : []
    }

    const [roomInfo, setRoomInfo] = useState(setRoom)

    useEffect(() => {
        const json = JSON.parse(window.localStorage.getItem("project_write"))
        setData({ ...json, ...roomInfo })
    }, [roomInfo])

    return (
        <RoomInfoContext.Provider value={{ setRoomInfo, roomInfo }}>
            {children}
        </RoomInfoContext.Provider>
    )
}