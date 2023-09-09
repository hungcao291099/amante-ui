import ManagerLayout from "@components/manager/ManagerLayout";
import styles from "@styles/ConceptRoom.module.css";
import {useEffect, useRef, useState} from "react";
import {getStyles, getDetailed, insertStyle, updateStyle, insertDetail, updateDetail} from "@apis/style.api";

export default () => {
    const [page, setPage] = useState("styles")
    const [data, setData] = useState(undefined)
    const [detailedData, setDetailedData] = useState(undefined)
    const [selected, setSelected] = useState(undefined)
    const [isEdit, setIsEdit] = useState(false)
    const [isEditDetail, setIsEditDetail] = useState(false)
    const styleForm = new FormData()
    const enbRef = useRef(null);
    const disRef = useRef(null);
    const initialStyle = {
        h_name: "",
        file_enable: undefined,
        file_disable: undefined,
        use_yn: "Y",
    }
    const initialDetail = {
        d_name: "",
        use_yn: "Y",
    }
    const [inputStyle, setInputStyle] = useState(initialStyle)
    const [inputDetail, setInputDetail] = useState(initialDetail)

    const fetch = async () => {
        const result = await getStyles();
        setData(result.response);
        setSelected(result.response[0].h_code)
        return () => {
        }
    }

    const fetchDetailed = async (h_code) => {
        const result = await getDetailed(h_code)
        setDetailedData(result.response)
        return () => {
        }
    }

    const handleClick = (page) => {
        setPage(page)
    }

    useEffect(() => {
        fetch()
    }, [page])

    useEffect(() => {
        if (page === "details") {
            fetchDetailed(selected)
        }
    }, [selected, page])

    const handleSave = async () => {
        if (isEdit) {
            if (inputStyle.file_enable && inputStyle.file_nm_enb) {
                styleForm.append("deleted_file[]", inputStyle.file_nm_enb)
            }

            if (inputStyle.file_disable && inputStyle.file_nm_dis) {
                styleForm.append("deleted_file[]", inputStyle.file_nm_dis)
            }

            styleForm.append("h_code", inputStyle.h_code)
            styleForm.append("h_name", inputStyle.h_name)
            styleForm.append("file_nm_dis", inputStyle.file_nm_dis)
            styleForm.append("file_nm_enb", inputStyle.file_nm_enb)
            styleForm.append("style_icon_enb", inputStyle.file_enable)
            styleForm.append("style_icon_dis", inputStyle.file_disable)
            styleForm.append("use_yn", inputStyle.use_yn)
            styleForm.append("del_yn", "N")
            const response = await updateStyle(styleForm)
            if (response.status === "ok") {
                alert("OK")
            }
            setIsEdit(false)
        } else {
            styleForm.append("h_name", inputStyle.h_name)
            styleForm.append("style_icon_enb", inputStyle.file_enable)
            styleForm.append("style_icon_dis", inputStyle.file_disable)
            styleForm.append("use_yn", inputStyle.use_yn)
            styleForm.append("del_yn", "N")
            const response = await insertStyle(styleForm)
            if (response.status === "ok") {
                alert("OK")
            }
        }
        setInputStyle(initialStyle)
        fetch()
    }

    const handleCancel = () => {
        setInputStyle(initialStyle)
        enbRef.current.value = null;
        disRef.current.value = null;
        setIsEdit(false)
    }

    const handleInput = (type, e) => {
        switch (type) {
            case "h_name":
                setInputStyle({...inputStyle, h_name: e.target.value})
                break;
            case "file_enable":
                setInputStyle({...inputStyle, file_enable: e.target.files[0]})
                break;
            case "file_disable":
                setInputStyle({...inputStyle, file_disable: e.target.files[0]})
                break;
            case "use_yn":
                setInputStyle({...inputStyle, use_yn: e.target.value})
                break;
        }
    }

    const handleUse = async (style) => {
        styleForm.append("h_code", style.h_code)
        styleForm.append("h_name", style.h_name)
        styleForm.append("file_nm_dis", style.file_nm_dis)
        styleForm.append("file_nm_enb", style.file_nm_enb)
        styleForm.append("use_yn", style.use_yn === "Y" ? "N" : "Y")
        styleForm.append("del_yn", "N")
        const response = await updateStyle(styleForm)
        if (response.status === "ok") {
            alert("OK")
        }
        fetch()
        setInputStyle(initialStyle)
    }

    const handleDelete = async (style) => {
        if (window.confirm("이것을 삭제하시겠습니까?")) {
            styleForm.append("h_code", style.h_code)
            styleForm.append("h_name", style.h_name)
            styleForm.append("file_nm_dis", style.file_nm_dis)
            styleForm.append("file_nm_enb", style.file_nm_enb)
            styleForm.append("use_yn", style.use_yn)
            styleForm.append("del_yn", "Y")
            const response = await updateStyle(styleForm)
            if (response.status === "ok") {
                alert("OK")
            }
            fetch()
            setInputStyle(initialStyle)
        }
    }

    const handleEdit = async (style) => {
        setIsEdit(true)
        setInputStyle(style)
    }

    const handleCancelDetail = () => {
        setInputDetail(initialDetail)
        setIsEditDetail(false)
    }

    const handleSaveDetail = async () => {
        const response = await insertDetail({
            d_name: inputDetail.d_name,
            use_yn: inputDetail.use_yn,
            del_yn: "N",
            h_code: selected
        });

        if(response.status === "ok") {
            alert("Ok")
        }
        setInputDetail(initialDetail)
        fetchDetailed(selected)
    }

    const handleInputDetail = (type, e) => {
        if(type === "d_name") {
            setInputDetail({...inputDetail, d_name: e.target.value})
        }

        if(type === "use_yn") {
            setInputDetail({...inputDetail, use_yn: e.target.value})
        }
    }

    const handleDeleteDetail = async (detail) => {
        if(window.confirm("이것을 삭제하시겠습니까?")) {
            const response = await updateDetail({
                ...detail,
                del_yn: "Y"
            })
            if(response.status === "ok") {
                alert("OK")
            }
            fetchDetailed(selected)
        }
    }

    const handleUseDetail = async (detail) => {
        const response = await updateDetail({
            ...detail,
            use_yn: detail.use_yn === "Y" ? "N" : "Y"
        })
        if(response.status === "ok") {
            alert("OK")
        }
        fetchDetailed(selected)
    }

    const handleEditDetail = (detail) => {
        setInputDetail(detail)
        setIsEditDetail(true)
    }


    return (
        <ManagerLayout>
            <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-2">
                    <span className={styles.big__title}>컨셉룸 관리</span>
                    <span className={styles.small__title}>스타일 관리</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <button style={{background: page === "styles" ? "" : "#777"}} onClick={() => handleClick("styles")}
                            className={styles.link__btn}>스타일 관리
                    </button>
                    <button style={{background: page === "details" ? "" : "#777"}}
                            onClick={() => handleClick("details")}
                            className={styles.link__btn}>세부 관리
                    </button>
                </div>
                {page == "styles" ? (
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card p-4 d-flex flex-column gap-3">
                                <div className="d-flex align-items-center gap-3">
                                    <label style={{minWidth: "160px"}} className="form-label">스타일 이름 : </label>
                                    <input style={{maxWidth: "50%"}} onChange={(e) => handleInput("h_name", e)}
                                           value={inputStyle.h_name} type="text" className="form-control rounded-0"/>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <label style={{minWidth: "160px"}} className="form-label">아이콘 이미지 활성화 : </label>
                                    <input ref={enbRef} style={{maxWidth: "50%"}}
                                           onChange={(e) => handleInput("file_enable", e)}
                                           type="file" className="form-control rounded-0"/>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <label style={{minWidth: "160px"}} className="form-label">아이콘 이미지 비활성화 : </label>
                                    <input ref={disRef} style={{maxWidth: "50%"}}
                                           onChange={(e) => handleInput("file_disable", e)}
                                           type="file" className="form-control rounded-0"/>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <label style={{minWidth: "160px"}} className="form-label">사용 여부 : </label>
                                    <div className="d-flex gap-2 align-items-center">
                                        <input onChange={(e) => handleInput("use_yn", e)} id="use_y" name="use"
                                               checked={inputStyle.use_yn == "Y"} type="radio" value="Y"/>
                                        <label htmlFor="use_y">출판하다</label>
                                    </div>
                                    <div className="d-flex gap-2 align-items-center">
                                        <input onChange={(e) => handleInput("use_yn", e)} id="use_n" name="use"
                                               type="radio" checked={inputStyle.use_yn == "N"} value="N"/>
                                        <label htmlFor="use_n">게시취소</label>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center gap-3">
                                        <button onClick={handleSave} className={styles.link__btn}>등록</button>
                                        <button onClick={handleCancel} className={styles.link__btn}>취소</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <table className={styles.table}>
                                <thead>
                                <tr style={{background: "#f4f4f4"}}>
                                    <th className="text-center py-2" style={{width: "100px"}}>스타일 코드</th>
                                    <th className="">스타일 이름</th>
                                    <th className="text-center">사용 여부</th>
                                    <th className="text-center" style={{width: "120px"}}>#</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data && data.map(el => (
                                    <tr key={el.h_code}>
                                        <td className="text-center p-2">{el.h_code}</td>
                                        <td className="">{el.h_name}</td>
                                        <td className="text-center">
                                            <button onClick={(e) => handleUse(el)}
                                                    className={styles.link__btn}>{el.use_yn}</button>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex gap-2">
                                                <button onClick={() => handleEdit(el)} className={styles.link__btn}>수정
                                                </button>
                                                <button onClick={() => handleDelete(el)}
                                                        className={styles.link__btn}>삭제
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card p-4 d-flex flex-column gap-3">
                                <div className="d-flex align-items-center gap-3">
                                    <label style={{minWidth: "100px"}} className="form-label">스타일: </label>
                                    <select onChange={(e) => setSelected(e.target.value)} style={{maxWidth: "50%"}}
                                            className="form-select rounded-0">
                                        {data && data.map((el, idx) => (
                                            <option key={idx} value={el.h_code}>{el.h_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <label style={{minWidth: "100px"}} className="form-label">상세한 이름 : </label>
                                    <input style={{maxWidth: "50%"}} onChange={(e) => handleInputDetail("d_name", e)}
                                           type="text" value={inputDetail.d_name} className="form-control rounded-0"/>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <label style={{minWidth: "100px"}} className="form-label">사용 여부 : </label>
                                    <div className="d-flex gap-2 align-items-center">
                                        <input onChange={(e) => handleInputDetail("use_yn", e)} id="use_y" name="use"
                                               checked={inputDetail.use_yn == "Y"} type="radio" value="Y"/>
                                        <label htmlFor="use_y">출판하다</label>
                                    </div>
                                    <div className="d-flex gap-2 align-items-center">
                                        <input onChange={(e) => handleInputDetail("use_yn", e)} id="use_n" name="use"
                                               type="radio" checked={inputDetail.use_yn == "N"} value="N"/>
                                        <label htmlFor="use_n">게시취소</label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center gap-3">
                                    <button onClick={handleSaveDetail} className={styles.link__btn}>등록</button>
                                    <button onClick={handleCancelDetail} className={styles.link__btn}>취소</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <table className={styles.table}>
                                <thead>
                                <tr style={{background: "#f4f4f4"}}>
                                    <th className="text-center py-2" style={{width: "100px"}}>자세한 코드</th>
                                    <th className="">상세한 이름</th>
                                    <th className="text-center">사용 여부</th>
                                    <th className="text-center" style={{width: "120px"}}>#</th>
                                </tr>
                                </thead>
                                <tbody>
                                {detailedData && detailedData.map(el => (
                                    <tr key={el.d_code}>
                                        <td className="text-center p-2">{el.d_code}</td>
                                        <td className="">{el.d_name}</td>
                                        <td className="text-center">
                                            <button onClick={(e) => handleUseDetail(el)}
                                                    className={styles.link__btn}>{el.use_yn}</button>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex gap-2">
                                                <button onClick={() => handleEditDetail(el)}
                                                        className={styles.link__btn}>수정
                                                </button>
                                                <button onClick={() => handleDeleteDetail(el)}
                                                        className={styles.link__btn}>삭제
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </ManagerLayout>

    )
}
