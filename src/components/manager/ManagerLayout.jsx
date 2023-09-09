import TopMenu from "./TopMenu"
import SideMenu from "./SideMenu"

export default ({children}) => {
    return (
        <div className="d-flex flex-column">
            <TopMenu/>
            <div className="d-flex" style={{paddingTop: "90px"}}>
                <SideMenu/>
                <div className="m-5 w-100 loading_room" style={{paddingLeft: "140px"}}>
                    {children}
                </div>
            </div>
        </div>
    )
}