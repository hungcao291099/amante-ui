import { Link, useLocation } from "react-router-dom"

export default () => {
    const location = useLocation()
    const link = {
        width: "100%",
        height: "40px",
        color: "#777",
        fontSize: "12px",
        fontWeight: "bold",
    }

    return (
        <div style={{ width: "140px", background: "#f4f4f4", minHeight: "100vh", position: "fixed", top: "90px", left: 0,  }}>
            <ul className="d-flex flex-column justify-content-center list-unstyled">
                <li className="w-100" >
                    <Link
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            ...link,
                            background: location.pathname === "/manager/concept-room/list" ? "#fff" : "transparent",
                        }}
                        to={"/manager/concept-room/list"}>컨셉룸 관리</Link>
                </li>
                <li className="w-100" >
                    <Link
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            ...link,
                            background: location.pathname === "/manager/styles/list" ? "#fff" : "transparent",
                        }}
                        to={"/manager/styles/list"}>스타일 관리</Link>
                </li>
                <li className="w-100" >
                    <Link
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            ...link,
                            background: location.pathname === "/manager/product-reg/list" ? "#fff" : "transparent",
                        }}
                        to={"/manager/product-reg/list"}>컨셉룸 제품 조회</Link>
                </li>
                <li className="w-100" >
                    <Link
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            ...link,
                            background: location.pathname === "/manager/cdn-config" ? "#fff" : "transparent",
                        }}
                        to={"/manager/cdn-config"}>CDN 구성</Link>
                </li>
            </ul>
        </div>
    )
}