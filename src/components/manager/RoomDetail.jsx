import styles from "@components/manager/Write.module.css"
import styles2 from "@styles/ConceptRoomWrite.module.css"
import { uploadSingle, deleteSingle, deleteMultiple } from "@apis/uploadApi.jsx"
import { getProduct } from "@apis/productApi"
import { useState, useContext, useEffect } from "react"
import { RoomDetailContext } from "@contexts/Write/RoomDetailContext"
import { v4 as uuid } from "uuid"
import { baseImageUrl } from "@utils/constants"
import { productOptions } from "@utils/functions"
import Select from "react-select"

export default ({ data, mode, selectedView }) => {
    const { setView, view } = useContext(RoomDetailContext)
    const isEdit = JSON.parse(window.localStorage.getItem("isEdit"))
    const initTemp = { x: "00.00", y: "00.00", product_cd: "", product_nm: "" }
    const initObj = {
        thumbnail_img: "",
        option_nm: "",
        option_file_nm: "",
        product: [],
        out_url: "",
        out_product_nm: "",
        out_price: "",
        out_thumbnail: ""
    }
    const [viewData, setViewData] = useState(data)
    const [selected, setSelected] = useState({ id: "", options: [] })
    const [products, setProducts] = useState([])
    const [imageCoordEnable, setImageCoordEnable] = useState(false)
    const [tempIcon, setTempIcon] = useState(initTemp)
    const [openObjCard, setOpenObjCard] = useState(false)
    const [tempObj, setTempObj] = useState(initObj)
    const [tempThumb, setTempThumb] = useState(
        {
            ...initTemp,
            child_obj: [],
            width: mode == "L" ? "770" : "100",
            height: mode == "L" ? "680" : "100"
        })
    const [isEditObj, setIsEditObj] = useState(false)
    const [editProductObj, setEditProductObj] = useState({})
    const [openThumbConfig, setOpenThumbConfig] = useState(false)
    const [imageObjEnable, setImageObjEnable] = useState(false)
    const [isEditCoord, setIsEditCoord] = useState(false)
    const [openThirdParty, setOpenThirdParty] = useState(false)
    const [thirdPartyCoord, setThirdPartyCoord] = useState(false)
    const [isModify, setIsModify] = useState(false)
    const [outProduct, setOutProduct] = useState({
        id: "",
        x: "00.00",
        y: "00.00",
        product_nm: "",
        url: "",
        thumbnail_img: "",
        price: ""
    })

    useEffect(() => {
        if (selectedView === data.view_nm) {
            const handlePress = (e) => {
                if (e.code === "Escape") {
                    if (openThumbConfig) {
                        handleCancelConfig()
                    }

                    if (openObjCard) {
                        handleCancelObj()
                    }

                    // if (openThirdParty) {
                    //     handleCancelThirdPartyCoord()
                    // }
                }
            }
            document.addEventListener("keydown", handlePress);

            return () => {
                document.removeEventListener("keydown", handlePress)
            }
        }
    }, [openThumbConfig, openObjCard, openThirdParty])

    const fetchProduct = async () => {
        const result = await getProduct();
        setProducts(productOptions(result.response))
        return () => { }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    useEffect(() => {
        setView(view.map(el => el.view_nm == data.view_nm ? viewData : el))
    }, [viewData])

    const handleDelete = async (id, file_nm, options) => {
        if (isEdit) {
            if (window.confirm("경고, 이 작업은 기존 파일을 삭제합니다. 계속하시겠습니까?")) {
                await deleteSingle({ folder: "concept_room", file_nm: file_nm })
                const arr = []
                const arr2 = []
                for (const option of options) {
                    if (option.thumbnail_img != "") {
                        arr.push(option.thumbnail_img)
                    }

                    if (option.option_file_nm != "") {
                        arr2.push(option.option_file_nm)
                    }
                }
                arr.length && await deleteMultiple({ folder: "concept_room", files: JSON.stringify(arr) })
                arr2.length && await deleteMultiple({ folder: "concept_room/object", files: JSON.stringify(arr2) })
                setSelected({ id: "", options: [] })
                setViewData({ ...viewData, room_object: viewData.room_object.filter(el => el.id != id) })
            }
        } else {
            await deleteSingle({ folder: "concept_room", file_nm: file_nm })
            const arr = []
            const arr2 = []
            for (const option of options) {
                if (option.thumbnail_img != "") {
                    arr.push(option.thumbnail_img)
                }

                if (option.option_file_nm != "") {
                    arr2.push(option.option_file_nm)
                }
            }
            arr.length && await deleteMultiple({ folder: "concept_room", files: JSON.stringify(arr) })
            arr2.length && await deleteMultiple({ folder: "concept_room/object", files: JSON.stringify(arr2) })
            setSelected({ id: "", options: [] })
            setViewData({ ...viewData, room_object: viewData.room_object.filter(el => el.id != id) })
        }
    }

    const handleSelectThumb = (array, id) => {
        setSelected({ id: id, options: array })
        if (selected.id && selected.id == id) {
            const thumb = viewData.room_object.filter(el => el.id == id)[0]
            if (thumb) {
                window.localStorage.setItem("current_img", thumb.thumbnail_img)
                setTempThumb({ ...thumb, x: thumb.object_pos_x, y: thumb.object_pos_y })
                setTempIcon({ x: thumb.coord_x, y: thumb.coord_y })
                setIsEditCoord(true)
                setIsModify(false)
                if (thumb.options.length || (thumb.product_cd && thumb.product_nm) || thumb.thumbnail_img !== "") {
                    setIsModify(true)
                }
                setIsEditCoord(true)
                if (thumb.custom_url) {
                    setOpenThirdParty(true)
                } else {
                    setOpenThumbConfig(true)
                }
            }
        }
    }

    const handleUploadPreviewImg = async (type, e) => {
        try {
            switch (type) {
                case "p_light":
                    if (viewData.file_nm != "") {
                        await deleteSingle({ folder: "concept_room", file_nm: viewData.file_nm_l })
                        setViewData({ ...viewData, file_nm: "" })
                    }
                    const formPLight = new FormData()
                    formPLight.append("concept_room_file", e.target.files[0])
                    const pLightRes = await uploadSingle(formPLight, "concept_room")
                    if (pLightRes.status == "ok") {
                        setViewData({ ...viewData, file_nm: pLightRes.response })
                    }
                    break
                case "o_thumb":
                    const formOThumb = new FormData()
                    formOThumb.append("concept_room_file", e.target.files[0])
                    const oThumbRes = await uploadSingle(formOThumb, "concept_room")
                    if (tempThumb.thumbnail_img != "") {
                        window.localStorage.setItem("temp", oThumbRes.response)
                    }
                    if (oThumbRes.status == "ok") {
                        setTempThumb({ ...tempThumb, thumbnail_img: oThumbRes.response })
                    }
                    break
                case "out_pro":
                    const proForm = new FormData()
                    proForm.append("concept_room_file", e.target.files[0])
                    const proRes = await uploadSingle(proForm, "concept_room")
                    if (proRes.status == "ok") {
                        setTempObj({...tempObj, out_thumbnail: proRes.response})
                    }
                    break
                case "out_prd":
                    const out = new FormData()
                    out.append("concept_room_file", e.target.files[0])
                    const outPrd = await uploadSingle(out, "concept_room")
                    if (outPrd.status == "ok") {
                        setOutProduct({ ...outProduct, thumbnail_img: outPrd.response })
                    }
                    break
            }
            e.target.value = null
        } catch (error) {
            alert("Not accept this file type")
        }
    }

    const handleSetCoord = (e) => {
        const rect = e.target.getBoundingClientRect();
        let left = (((e.clientX - rect.left - 10) / rect.width) * 100).toFixed(2)
        let top = (((e.clientY - rect.top - 10) / rect.height) * 100).toFixed(2)

        left = left >= 100 ? 100 : left
        left = left <= 0 ? 0 : left
        top = top >= 100 ? 100 : top
        top = top <= 0 ? 0 : top


        if (imageCoordEnable) {
            setTempIcon({ ...tempIcon, x: left, y: top })
        } else {
            setImageCoordEnable(false)
        }

        if (imageObjEnable && mode != 'L' && selected.options.length) {
            setTempThumb({ ...tempThumb, x: left, y: top })
        } else {
            setImageObjEnable(false)
        }


        if (thirdPartyCoord) {
            setOutProduct({ ...outProduct, x: left, y: top })
        } else {
            setThirdPartyCoord(false)
        }


    }

    const handleChangeCoord = (type, e) => {
        if (type == "x") {
            setTempIcon({ ...tempIcon, x: e.target.value })
        } else if (type == "y") {
            setTempIcon({ ...tempIcon, y: e.target.value })
        }
    }

    const handleOpenObject = () => {
        if (selected.id != "") {
            const thumb = viewData.room_object.filter(el => el.id == selected.id)[0]
            setTempThumb({ ...thumb, x: thumb.object_pos_x, y: thumb.object_pos_y })
            setOpenObjCard(true)
        } else {
            alert("썸네일 이미지를 선택하세요.")
        }
    }

    const handleCancelObj = async () => {
        setOpenObjCard(false)
        setTempObj(initObj)
        setIsEditObj(false)
        const c_img = window.localStorage.getItem("c_img")
        const o_img_l = window.localStorage.getItem("o_img_l")
        const o_img_n = window.localStorage.getItem("o_img_n")

        if (c_img) {
            await deleteSingle({ file_nm: c_img, folder: "concept_room" })
        }
        if (o_img_l) {
            await deleteSingle({ file_nm: o_img_l, folder: "concept_room/object" })
        }
        if (o_img_n) {
            await deleteSingle({ file_nm: o_img_n, folder: "concept_room/object" })
        }

        window.localStorage.removeItem("c_img")
        window.localStorage.removeItem("o_img_l")
        window.localStorage.removeItem("o_img_n")
    }

    const handleDeleteObj = async (el, idx) => {
        if (isEdit) {
            if (window.confirm("경고, 이 작업은 기존 파일을 삭제합니다. 계속하시겠습니까?")) {
                await deleteSingle({ file_nm: el.thumbnail_img, folder: "concept_room" })
                await deleteMultiple({ folder: "concept_room/object", files: JSON.stringify([el.option_file_nm_l, el.option_file_nm_d]) })
                setSelected({ ...selected, options: selected.options.filter((o, i) => i != idx) })
                setOpenObjCard(false)
            }
        } else {
            await deleteSingle({ file_nm: el.thumbnail_img, folder: "concept_room" })
            await deleteMultiple({ folder: "concept_room/object", files: JSON.stringify([el.option_file_nm_l, el.option_file_nm_d]) })
            setSelected({ ...selected, options: selected.options.filter((o, i) => i != idx) })
            setOpenObjCard(false)
        }

    }

    const handleSaveObj = () => {
        if (tempObj.option_file_nm !== "" && tempObj.thumbnail_img !== "") {
            if (isEditObj == "") {
                setSelected({ ...selected, options: [...selected.options, { id: uuid(), ...tempObj }] })
            } else {
                setSelected({ ...selected, options: selected.options.map((el, idx) => el.id == editProductObj ? { ...tempObj } : el) })
            }
            alert("성공")
            setOpenObjCard(false)
            setIsEditObj(false)
            setTempObj(initObj)
            window.localStorage.removeItem("c_img")
            window.localStorage.removeItem("o_img_l")
            window.localStorage.removeItem("o_img_n")
        } else {
            alert("개체 이미지를 등록하세요")
        }
    }

    const handleObjectInput = async (type, e) => {
        switch (type) {
            case "c_img":
                const cImgForm = new FormData()
                if (tempObj.thumbnail_img != "") {
                    await deleteSingle({ file_nm: tempObj.thumbnail_img, folder: "concept_room" })
                    setTempObj({ ...tempObj, thumbnail_img: "" })
                }
                cImgForm.append("concept_room_file", e.target.files[0])
                const cImgRes = await uploadSingle(cImgForm, "concept_room")
                if (cImgRes.status == "ok") {
                    setTempObj({ ...tempObj, thumbnail_img: cImgRes.response })
                    window.localStorage.setItem("c_img", cImgRes.response)
                }
                break
            case "o_img_l":
                const oImgForm = new FormData()
                if (tempObj.option_file_nm != "") {
                    await deleteSingle({ file_nm: tempObj.option_file_nm, folder: "concept_room/object" })
                    setTempObj({ ...tempObj, option_file_nm: "" })
                }
                oImgForm.append("concept_room_file", e.target.files[0])
                const oImgRes = await uploadSingle(oImgForm, "concept_room/object")
                if (oImgRes.status == "ok") setTempObj({ ...tempObj, option_file_nm: oImgRes.response })
                window.localStorage.setItem("o_img_l", oImgres.response)
                break
            case "o_img_n":
                const oImgForm1 = new FormData()
                if (tempObj.option_file_nm_d != "") {
                    await deleteSingle({ file_nm: tempObj.option_file_nm_d, folder: "concept_room/object" })
                    setTempObj({ ...tempObj, option_file_nm_d: "" })
                }
                oImgForm1.append("concept_room_file", e.target.files[0])
                const oImgRes1 = await uploadSingle(oImgForm1, "concept_room/object")
                if (oImgRes1.status == "ok") setTempObj({ ...tempObj, option_file_nm_d: oImgRes1.response.filename })
                window.localStorage.setItem("o_img_n", oImgRes1.response.filename)
                break
            case "clr":
                setTempObj({ ...tempObj, color_cd: e.value, option_nm: e.label })
                break
            case "w":
                setTempObj({ ...tempObj, width: e.target.value })
                break
            case "h":
                setTempObj({ ...tempObj, height: e.target.value })
                break
            case "x":
                setTempThumb({ ...tempThumb, x: e.target.value })
                break
            case "y":
                setTempThumb({ ...tempThumb, y: e.target.value })
                break
            case "pro_obj":
                setTempObj({ ...tempObj, product_cd: e.value, product_nm: e.label })
                break
            case "multi_obj":
                setTempObj({ ...tempObj, product: e })
                break
        }
    }

    useEffect(() => {
        if (selected.id != "") {
            setViewData({
                ...viewData,
                room_object: viewData.room_object
                    .map(el => el.id == selected.id ? {
                        ...el,
                        options: selected.options,
                        out_url: el.url || el.out_url,
                        out_product_nm: el.product_nm || el.out_product_nm,
                        out_price: el.out_price || el.price,
                        out_thumbnail: el.out_thumbnail
                    } : el)
            })
        }
    }, [selected])

    const handleEditObj = (el, idx) => {
        setEditProductObj(el.id)
        setIsEditObj(true)
        setOpenObjCard(true)
        setTempObj(el)
    }

    const handleCancelConfig = async () => {
        setOpenThumbConfig(false)
        if (tempThumb.thumbnail_img && tempThumb.thumbnail_img != "" && selected.id == "") {
            await deleteSingle({ folder: "concept_room", file_nm: tempThumb.thumbnail_img })
        } else {
            const img = window.localStorage.getItem("temp")
            if (img) {
                await deleteSingle({ folder: "concept_room", file_nm: img })
                window.localStorage.removeItem("temp")
            }
        }

        const dt = viewData.room_object.filter(el => el.id == selected.id)[0]
        const item = document.querySelector(`[data-thumb="${selected.id}"]`)
        if (item) {
            item.style.zIndex = dt.od
        }
        setTempThumb({
            ...initTemp,
            child_obj: [],
            width: mode == "L" ? "770" : "100",
            height: "100",
        })
        setTempIcon(initTemp)
        setImageObjEnable(false)
        setIsEditCoord(false)
        setIsModify(false)
    }

    const handleInputConfig = (type, e) => {
        switch (type) {
            case "p_obj":
                setTempThumb({ ...tempThumb, custom_nm: e.label, product_cd: e.value })
                break
            case "x":
                setTempThumb({ ...tempThumb, x: e.target.value })
                break
            case "y":
                setTempThumb({ ...tempThumb, y: e.target.value })
                break
            case "r_obj":
                const value = e.target.value
                if (e.target.checked) {
                    setTempThumb({ ...tempThumb, child_obj: [...tempThumb.child_obj, value] })
                } else {
                    setTempThumb({ ...tempThumb, child_obj: tempThumb.child_obj.filter(el => el != value) })
                }
                break
            case "3d":
                setViewData({ ...viewData, slide_url: e.target.value })
                break
        }
    }

    const handleSaveConfig = async () => {
        if (isModify) {
            const current_img = window.localStorage.getItem("current_img")
            if (current_img != tempThumb.thumbnail_img) {
                await deleteSingle({ folder: "concept_room", file_nm: current_img })
            }
            setViewData({
                ...viewData,
                room_object: viewData.room_object.map(el => el.id == selected.id ?
                    {
                        ...el,
                        thumbnail_img: tempThumb.thumbnail_img,
                        child_obj: tempThumb.child_obj,
                        object_pos_x: mode == "L" ? "00.00" : tempThumb.x,
                        object_pos_y: mode == "L" ? "00.00" : tempThumb.y,
                        product_cd: tempThumb.product_cd,
                        width: mode == "L" ? "770" : tempThumb.width,
                        height: mode == "L" ? "680" : tempThumb.height,
                        custom_nm: tempThumb.custom_nm,
                        coord_x: tempIcon.x,
                        coord_y: tempIcon.y,
                        od: tempThumb.od || viewData.room_object.length,
                        out_url: tempThumb.out_url,
                        out_product_nm: tempThumb.out_product_nm,
                        out_thumbnail: tempThumb.out_thumbnail,
                        out_price: tempThumb.out_price
                    } : el),
            })
        } else {
            let thumb = {
                id: uuid(),
                thumbnail_img: tempThumb.thumbnail_img,
                options: [],
                child_obj: [],
                width: mode == "L" ? "770" : "100",
                height: mode == "L" ? "680" : "100",
                coord_x: tempIcon.x,
                coord_y: tempIcon.y,
                object_pos_x: tempThumb.x,
                object_pos_y: tempThumb.y,
                product_cd: tempThumb.product_cd,
                custom_nm: tempThumb.custom_nm,
                od: viewData.room_object.length,
                out_url: tempThumb.out_url,
                out_product_nm: tempThumb.out_product_nm,
                out_thumbnail: tempThumb.out_thumbnail,
                out_price: tempThumb.out_price
            }
            setViewData({ ...viewData, room_object: [...viewData.room_object, thumb] })
        }

        setTempThumb({
            ...initTemp,
            child_obj: [],
            width: mode == "L" ? "770" : "100",
            height: mode == "L" ? "680" : "100",
            out_url: "",
            out_product_nm: "",
            out_thumbnail: "",
            out_price: "",
        })
        alert("성공")
        setTempIcon(initTemp)
        setImageCoordEnable(false)
        setOpenThumbConfig(false)
        setIsEditCoord(false)
        setIsModify(false)
        window.localStorage.removeItem("current_img")
        window.localStorage.removeItem("temp")
    }

    const handleEnableCoord = () => {
        setImageObjEnable(false)
        setImageCoordEnable(true)
        setThirdPartyCoord(false)
    }

    const handleEnableObj = () => {
        setImageObjEnable(true)
        setImageCoordEnable(false)
        setThirdPartyCoord(false)
        setTempThumb({ ...tempThumb, options: selected.options })
    }

    const handleEnableThirdPartyCoord = () => {
        setThirdPartyCoord(true);
    }

    const handleOpenThirdPartyConfig = () => {
        setOpenThirdParty(true)
    }

    const handleSaveThirdPartyCoord = () => {
        if (outProduct.product_nm !== "" && outProduct.url !== "") {
            if (outProduct.id !== "") {
                setViewData({
                    ...viewData, outside_prd: viewData.outside_prd.map(out => out.id === outProduct.id ? {
                        ...outProduct
                    } : out)
                })
            } else {
                setViewData({ ...viewData, outside_prd: [...viewData.outside_prd, { ...outProduct, id: uuid() }] })
            }
            handleCancelThirdPartyCoord()
        }
    }

    const handleCancelThirdPartyCoord = () => {
        setThirdPartyCoord(false)
        setOpenThirdParty(false)
        setOutProduct({
            id: "",
            product_nm: "",
            url: "",
            x: "00.00",
            y: "00.00",
        })
    }

    const handleEditThirdCoord = (el) => {
        setOutProduct(el);
        setOpenThirdParty(true);
    }

    const handleDeleteThirdPartyCoord = () => {
        setViewData({ ...viewData, outside_prd: viewData.outside_prd.filter(x => x.id !== outProduct.id) })
        setOpenThirdParty(false);
        setThirdPartyCoord(false);
        setOutProduct({
            id: "",
            product_nm: "",
            url: "",
            x: "00.00",
            y: "00.00",
        })
    }

    const handleOrder = (mode) => {
        if (selected.id != "") {
            const room_object = viewData.room_object.filter(el => el.id == selected.id)[0]
            const old_od = room_object.od
            if (mode == "asc") {
                setViewData(
                    {
                        ...viewData,
                        room_object: viewData.room_object.map(el => el.id == selected.id && el.od < viewData.room_object.length - 1 ? {
                            ...el,
                            od: parseInt(el.od) + 1
                        } : el.od == old_od + 1 ? {
                            ...el,
                            od: old_od
                        } : el)
                    }
                )
            }

            if (mode == "desc") {
                setViewData(
                    {
                        ...viewData,
                        room_object: viewData.room_object.map(el => el.id == selected.id && el.od > 0 ? {
                            ...el,
                            od: parseInt(el.od) - 1
                        } : el.od == old_od - 1 ? {
                            ...el,
                            od: old_od
                        } : el)
                    }
                )
            }
        }
    }


    return (
        <div className={styles.detail__container}>
            <div>
                {(viewData.file_nm) ? (
                    <div className={mode == 'L' ? styles.preview__container2 : styles.preview__container} onClick={handleSetCoord}>

                        {((tempIcon.x && tempIcon.y) && (tempIcon.x != "" && tempIcon.y != "") && (tempIcon.x != "00.00" && tempIcon.y != "00.00")) &&
                            <img style={{ top: `${tempIcon.y}%`, left: `${tempIcon.x}%`, zIndex: 999 }} className={styles.point + " pe-none"} src="/tag.png" />
                        }

                        {outProduct.x !== "00.00" && outProduct.y !== "00.00" && outProduct.id == "" && (
                            <img style={{ top: `${outProduct.y}%`, left: `${outProduct.x}%`, zIndex: 999 }} className={styles.point + " pe-none"} src="/tag.png" />
                        )}

                        {viewData?.room_object && viewData.room_object.map((el, idx) => {
                            let render = []
                            el?.options && el.options.map((el2, idx2) => {
                                if ((el.object_pos_x != "00.00" && el.object_pos_y != "00.00") && mode != "L" && el.object_pos_x && el.object_pos_y) {
                                    render.push(
                                        <img key={idx2} id={el2.id} style={{
                                            top: selected.id == el.id && tempThumb.y != "00.00" ? `${tempThumb.y}%` : `${el.object_pos_y}%`,
                                            left: selected.id == el.id && tempThumb.x != "00.00" ? `${tempThumb.x}%` : `${el.object_pos_x}%`,
                                            width: selected.id == el.id && tempThumb.width != "100" ? `${tempThumb.width}px` : `${el.width}px`,
                                            height: selected.id == el.id && tempThumb.height != "100" ? `${tempThumb.height}px` : `${el.height}px`,
                                            zIndex: `${el.od || 0}`
                                        }}
                                            className={`${styles.point} pe-none`}
                                            data-thumb={el.id}
                                            src={`${baseImageUrl}/concept_room/object/${el2.option_file_nm}`} />
                                    )
                                }
                            })
                            return render
                        })}

                        {mode == "L" ? (
                            viewData?.room_object && viewData.room_object.map((el, idx) => {
                                let render = []
                                el?.options && el.options.map((el2, idx2) => {
                                    render.push(
                                        <img key={idx2} id={el2.id} style={{
                                            top: `0`,
                                            left: `0`,
                                            width: `770px`,
                                            height: `680px`,
                                            zIndex: `${el.od || 0}`
                                        }}
                                            className={`${styles.point} pe-none`}
                                            data-thumb={el.id}
                                            src={`${baseImageUrl}/concept_room/object/${el2.option_file_nm}`} />
                                    )
                                })
                                return render
                            })
                        ) : ""}


                        {tempThumb.options && tempThumb.options.map((el, idx) => (
                            ((tempThumb.x && tempThumb.y && mode != "L") || (tempThumb.id != selected.id && mode != "L") ? (
                                <img key={idx} style={{
                                    top: `${tempThumb.y}%`,
                                    left: `${tempThumb.x}%`,
                                    width: `${tempThumb.width}px`,
                                    height: `${tempThumb.height}px`,
                                    zIndex: `${tempThumb.od - 1 >= 0 ? tempThumb.id - 1 : 0}`
                                }}
                                    className={`${styles.point} pe-none`}
                                    data-thumb={el.id}
                                    src={`${baseImageUrl}/concept_room/object/${el.option_file_nm}`} />
                            ) : "")
                        ))}

                        {viewData?.room_object && viewData.room_object.map((el, idx) => (
                            (el.coord_x && el.coord_y && el.coord_x != "00.00" && el.coord_y != "00.00" && !isEditCoord ? (
                                <img
                                    key={idx}
                                    style={{ top: `${el.coord_y}%`, left: `${el.coord_x}%`, zIndex: 999 }}
                                    className={styles.point + " pe-none"}
                                    src="/tag.png" />
                            ) : "")
                        ))}

                        {viewData?.outside_prd && viewData?.outside_prd.map((el, idx) => (
                            <img onClick={(e) => handleEditThirdCoord(el)} style={{ top: `${el.id === outProduct.id ? outProduct.y : el.y}%`, left: `${el.id === outProduct.id ? outProduct.x : el.x}%`, zIndex: 999 }} className={styles.point} src="/tag.png" />
                        ))}

                        <img className={styles.img} src={`${baseImageUrl}/concept_room/${viewData.file_nm}`} />
                    </div>
                ) : ""}
            </div>
            <div className={styles.view__right__col}>
                <div className="d-flex align-items-center gap-3">
                    <div className={styles.room__input__group}>
                        <label style={{ minWidth: "200px" }} className={styles.label}>배경 이미지</label>
                        <input style={{ width: "25vw" }} readOnly value={viewData.file_nm} placeholder="파일선택" type="text" className={styles.input} />
                    </div>
                    <label className={styles2.file__label}>
                        <input onChange={(e) => handleUploadPreviewImg("p_light", e)} className={styles2.file__input} type="file" />
                        <span className={styles2.save__btn}>찾아보기</span>
                    </label>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <div className={styles.room__input__group}>
                        <label style={{ minWidth: "200px" }} className={styles.label}>3D 슬라이드 URL</label>
                        <input style={{ width: "25vw" }} onChange={(e) => handleInputConfig("3d", e)} value={viewData.slide_url} placeholder="파일선택" type="text" className={styles.input} />
                    </div>
                </div>
                <div className="d-flex flex-column gap-3">
                    <h3 className={styles.label}>컨셉룸 오브젝트</h3>
                    <div className={styles.object__container}>
                        <div style={{ position: "relative" }} className="d-flex gap-3 align-items-center">
                            {viewData?.room_object && viewData.room_object.map((el, idx) => (
                                <span key={idx} className={el.id == selected.id ? styles.img__item__active : styles.img__item}>
                                    <img onClick={() => handleSelectThumb(el.options, el.id, el)} className={styles.img} src={`${baseImageUrl}/concept_room/${el.thumbnail_img}`} />
                                    <img onClick={() => handleDelete(el.id, el.thumbnail_img, el.options)} className={styles.xmark} src="/images/xmark.svg" />
                                </span>
                            ))}
                            {(viewData?.room_object && viewData.room_object.length < 6) ? (
                                <label className={styles2.file__label}>
                                    <img onClick={(e) => { setOpenThumbConfig(true) }} src="/images/add_icon.png" />
                                </label>
                            ) : ""}

                            {openThumbConfig && (<div className={styles.thumb__config}>
                                <h3 className={styles.label}>{isModify ? "컨셉룸 오브젝트 수정" : "컨셉룸 오브젝트 추가"}</h3>
                                <div className={styles.room__input__group}>
                                    <label className={styles.label}>썸네일 이미지 </label>
                                    <input className={styles.input} value={tempThumb.thumbnail_img} readOnly={true} />
                                    <label>
                                        <span
                                            style={{
                                                height: "36px",
                                                display: "flex",
                                                alignItems: "center",
                                                marginLeft: "5px",
                                            }}
                                            className={styles2.save__btn}>찾아보기</span>
                                        <input onChange={(e) => handleUploadPreviewImg("o_thumb", e)} className={styles2.file__input} type="file" />
                                    </label>
                                </div>
                                <div className={styles.input__coord__grp}>
                                    <label className={styles.label}>좌표</label>
                                    <div className={styles.room__input__group3}>
                                        <label style={{ minWidth: "30px" }} className={styles.label}>X: </label>
                                        <input value={tempThumb.x} onChange={(e) => handleInputConfig("x", e)} style={{ maxWidth: "85px", textAlign: "center" }} className={styles.input} type="text" />
                                    </div>
                                    <div className={styles.room__input__group3}>
                                        <label style={{ minWidth: "35px" }} className={styles.label}>Y: </label>
                                        <input value={tempThumb.y} onChange={(e) => handleInputConfig("y", e)} style={{ maxWidth: "85px", textAlign: "center" }} className={styles.input} type="text" />
                                    </div>
                                    <button onClick={handleEnableObj} className={styles.object__option}>클릭 하여 좌표 추가</button>
                                </div>
                                <div className={styles.input__coord__grp}>
                                    <label className={styles.label}>상품 소개 좌표</label>
                                    <div className={styles.room__input__group4} style={{ maxWidth: "117px" }}>
                                        <label style={{ minWidth: "20px" }} className={styles.label}>X: </label>
                                        <input onChange={(e) => handleChangeCoord("x", e)} value={tempIcon.x} type="text" className={styles.input} />
                                    </div>
                                    <div className={styles.room__input__group4} style={{ maxWidth: "117px" }}>
                                        <label style={{ minWidth: "20px" }} className={styles.label}>Y: </label>
                                        <input onChange={(e) => handleChangeCoord("y", e)} value={tempIcon.y} type="text" className={styles.input} />
                                    </div>
                                    <button onClick={handleEnableCoord} className={styles.object__option}>클릭 하여 좌표 추가</button>
                                </div>
                                <div className={styles.dimension}>
                                    <label className={styles.dimen__label}>이미지 크기</label>
                                    <div className={styles.room__input__group3}>
                                        <label style={{ minWidth: "50px" }} className={styles.label}>Width:</label>
                                        <input disabled={mode == "L"} onChange={(e) => setTempThumb({ ...tempThumb, width: e.target.value })} value={tempThumb.width} className={styles.input} type="text" />
                                    </div>
                                    <div className={styles.room__input__group3}>
                                        <label style={{ minWidth: "50px" }} className={styles.label}>Height:</label>
                                        <input disabled={mode == "L"} onChange={(e) => setTempThumb({ ...tempThumb, height: e.target.value })} value={tempThumb.height} className={styles.input} type="text" />
                                    </div>
                                </div>
                                <div className={styles.child__obj}>
                                    <h3 className={styles.label}>부모 오브젝트 설정</h3>
                                    <div className={styles.child__obj__container}>
                                        {viewData?.room_object && viewData.room_object.map((el, idx) => {
                                            const render = []
                                            if (el.id !== selected.id) {
                                                render.push(
                                                    <div key={idx} className={styles.group__check}>
                                                        <label className={styles.check__container}>
                                                            <input
                                                                onChange={(e) => handleInputConfig("r_obj", e)}
                                                                value={el.id}
                                                                checked={tempThumb.child_obj && tempThumb.child_obj.includes(el.id)}
                                                                type="checkbox"
                                                                className={styles.checkbox} name="styles" />
                                                            <span className={styles.checkmark__checkbox}></span>
                                                            <div className={styles.child__img}>
                                                                <img className={styles.img} src={`${baseImageUrl}/concept_room/${el.thumbnail_img}`} />
                                                            </div>
                                                        </label>
                                                    </div>
                                                )
                                            }
                                            return render
                                        })}
                                    </div>
                                </div>
                                <div className={styles.button__coord__grp}>
                                    <button onClick={handleCancelConfig} className={styles.button__cancel}>취소</button>
                                    <button onClick={handleSaveConfig} className={styles.button__save}>저장</button>
                                </div>
                            </div>)}

                        </div>
                        <hr />
                        <div className={`d-flex gap-3 align-items-center ${styles.options__container}`}>
                            {selected.options && selected.options.map((el, idx) => (
                                <span key={idx} className={styles.img__item}>
                                    <img onClick={() => handleEditObj(el, idx)} className={styles.img} src={`${baseImageUrl}/concept_room/${el.thumbnail_img}`} />
                                    <img onClick={() => handleDeleteObj(el, idx)} className={styles.xmark} src="/images/xmark.svg" />
                                </span>
                            ))}

                            <label className={styles2.file__label}>
                                <img onClick={handleOpenObject} src="/images/add_icon.png" />
                            </label>
                            {
                                openObjCard &&
                                (<div className={styles.object__card}>
                                    <h3 className={styles.title}>컨셉룸 오브젝트 종류 추가</h3>
                                    <div className={styles.room__input__group2}>
                                        <label className={styles.label}>개체 3D URL: </label>
                                        <input type="text" value={tempObj.option_nm} style={{ height: "30px" }} className={styles.input} onChange={(e) => setTempObj({ ...tempObj, option_nm: e.target.value })} />
                                    </div>
                                    <div className={styles.room__input__group}>
                                        <label className={styles.label}>제품명</label>
                                        <Select
                                            isMulti={true}
                                            placeholder=""
                                            className="w-100"
                                            value={tempObj.product}
                                            onChange={(data) => handleObjectInput("multi_obj", data)}
                                            classNamePrefix={styles.react__select} options={products} />
                                    </div>
                                    <div className={styles.input__wrapper}>
                                        <label className={styles.label}>종류 표지 이미지</label>
                                        <div className={styles.label__container}>
                                            <label className={`${styles2.file__label} ${styles.file__label}`}>
                                                <input onChange={(e) => handleObjectInput("c_img", e)} className={styles2.file__input} type="file" />
                                                <span className={styles2.file__label}>파일 선택</span>
                                            </label>
                                            <input readOnly value={tempObj.thumbnail_img} type="text" className={styles.file__txt} />
                                        </div>
                                    </div>
                                    <div className={styles.input__wrapper}>
                                        <label className={styles.label}>오브젝트 이미지</label>
                                        <div className={styles.label__container}>
                                            <label className={`${styles2.file__label} ${styles.file__label}`}>
                                                <input onChange={(e) => handleObjectInput("o_img_l", e)} className={styles2.file__input} type="file" />
                                                <span className={styles2.file__label}>파일 선택</span>
                                            </label>
                                            <input type="text" readOnly value={tempObj.option_file_nm} className={styles.file__txt} />
                                        </div>
                                    </div>
                                    <div className={styles.room__input__group2}>
                                        <label className={styles.label}>URL: </label>
                                        <input
                                            value={tempObj.out_url}
                                            onChange={(e) => setTempObj({ ...tempObj, out_url: e.target.value })}
                                            type="text" className={styles.input} />
                                    </div>
                                    <div className={styles.room__input__group2}>
                                        <label className={styles.label}>상품명: </label>
                                        <input
                                            value={tempObj.out_product_nm}
                                            onChange={(e) => setTempObj({ ...tempObj, out_product_nm: e.target.value })}
                                            type="text" className={styles.input} />
                                    </div>
                                    <div className={styles.room__input__group}>
                                        <label className={styles.label}>제품 이미지 </label>
                                        <input className={styles.input} value={tempObj.out_thumbnail} readOnly={true} />
                                        <label>
                                            <span
                                                style={{
                                                    height: "36px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginLeft: "5px",
                                                }}
                                                className={styles2.save__btn}>찾아보기</span>
                                            <input onChange={(e) => handleUploadPreviewImg("out_pro", e)} className={styles2.file__input} type="file" />
                                        </label>
                                    </div>
                                    <div className={styles.room__input__group2}>
                                        <label className={styles.label}>가격: </label>
                                        <input
                                            value={tempObj.out_price}
                                            onChange={(e) => setTempObj({...tempObj, out_price: e.target.value})}
                                            type="text" className={styles.input} />
                                    </div>
                                    <div className={styles.button__coord__grp}>
                                        <button onClick={handleCancelObj} className={styles.button__cancel}>취소</button>
                                        <button onClick={handleSaveObj} className={styles.button__save}>저장</button>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.object__coord}>
                    <button onClick={handleOpenThirdPartyConfig} className={styles.object__option}>제품 정보 추가</button>
                    {openThirdParty && (
                        <div>
                            <div className={styles.coord__card}>
                                <h3 className={styles.label}>컨셉룸 오브젝트 수정</h3>
                                <div className={styles.room__input__group2}>
                                    <label className={styles.label}>제품명: </label>
                                    <input
                                        value={outProduct.product_nm}
                                        onChange={(e) => setOutProduct({ ...outProduct, product_nm: e.target.value })}
                                        type="text" className={styles.input} />
                                </div>
                                <div className={styles.room__input__group2}>
                                    <label className={styles.label}>제품 URL: </label>
                                    <input
                                        onChange={(e) => setOutProduct({ ...outProduct, url: e.target.value })}
                                        value={outProduct.url}
                                        type="text"
                                        className={styles.input} />
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div className={styles.room__input__group}>
                                        <label className={styles.label}>영상: </label>
                                        <input readOnly value={outProduct.thumbnail_img} placeholder="파일선택" type="text" className={styles.input} />
                                    </div>
                                    <label className={styles2.file__label}>
                                        <input onChange={(e) => handleUploadPreviewImg("out_prd", e)} className={styles2.file__input} type="file" />
                                        <span className={styles2.save__btn}>찾아보기</span>
                                    </label>
                                </div>
                                <div className={styles.room__input__group2}>
                                    <label className={styles.label}>가격: </label>
                                    <input
                                        onChange={(e) => setOutProduct({ ...outProduct, price: e.target.value })}
                                        value={outProduct.price}
                                        type="text"
                                        className={styles.input} />
                                </div>
                                <div className={styles.input__coord__grp}>
                                    <label className={styles.label}>상품 소개 좌표</label>
                                    <div className={styles.room__input__group4} style={{ maxWidth: "110px" }}>
                                        <label style={{ minWidth: "20px" }} className={styles.label}>X: </label>
                                        <input onChange={(e) => setOutProduct({ ...outProduct, x: e.target.value })} value={outProduct.x} type="text" className={styles.input} />
                                    </div>
                                    <div className={styles.room__input__group4} style={{ maxWidth: "110px" }}>
                                        <label style={{ minWidth: "20px" }} className={styles.label}>Y: </label>
                                        <input onChange={(e) => setOutProduct({ ...outProduct, y: e.target.value })} value={outProduct.y} type="text" className={styles.input} />
                                    </div>
                                    <button onClick={handleEnableThirdPartyCoord} className={styles.object__option}>클릭 하여 좌표 추가</button>
                                </div>
                                <div className={styles.button__coord__grp}>
                                    <button onClick={handleCancelThirdPartyCoord} className={styles.button__cancel}>취소</button>
                                    <button onClick={handleSaveThirdPartyCoord} className={styles.button__save}>저장</button>
                                    {outProduct.id !== "" && <button onClick={handleDeleteThirdPartyCoord} className={styles.button__cancel}>삭제</button>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="d-flex gap-2">
                    <div className={styles.order__box}>
                        {viewData?.room_object && viewData.room_object.sort((a, b) => a.od > b.od ? -1 : 1).map((el, idx) => (
                            <div className={styles.order__div} key={idx}>
                                <span className={`text-center ${styles.od__text} ${selected.id == el.id ? styles.text__active : ""}`}>{el.od}</span>
                                <img
                                    onClick={() => handleSelectThumb(el.options, el.id)}
                                    className={`${styles.order__image} ${selected.id == el.id ? styles.active__od : ""}`}
                                    src={`${baseImageUrl}/concept_room/${el.thumbnail_img}`} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.od__btn__group}>
                        <button onClick={() => handleOrder("asc")} className={styles.order__btn}>
                            <i className="fa-solid fa-arrow-up"></i>
                        </button>
                        <button onClick={() => handleOrder("desc")} className={styles.order__btn}>
                            <i className="fa-solid fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}