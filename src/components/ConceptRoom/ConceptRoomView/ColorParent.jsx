import { useState, useEffect } from "react"
import $ from 'jquery'

import { useConceptRoomContext } from "@contexts/ConceptRoomContext"
import ColorItem from "./ColorItem"

const ColorParent = ({obj}) => {
  const { resetChanges, activeView, mode, isMobile } = useConceptRoomContext()
  const optId = $(`${isMobile ? ".content-mb" : ".content-pc"} .main-img.${mode} .product-obj-${activeView}.active[data-obj-seq=${obj.id}]`).attr("data-opt-seq")
  const [activeColor, setActiveColor] = useState(optId !== undefined ? optId : obj.options[0]?.id)

  
  /* This `useEffect` hook is setting the active color to the first option in the `obj.options` array
  whenever the `resetChanges` dependency changes. The `resetChanges` dependency is likely a state
  variable that is used to trigger a reset of the component's state and/or props. So, whenever the
  `resetChanges` state variable changes, the `useEffect` hook will run and set the active color to
  the first option in the `obj.options` array. */
  useEffect(() => { 
    setActiveColor(obj.options[0]?.id)
  },[resetChanges])

  return (
  // -------- COLOR item render ------------
  obj.options.map((opt, index) => {
    return <ColorItem key={index} opt={opt} obj={obj} activeColor={activeColor} setActiveColor={setActiveColor} number={index}/>
  }))
}

export default ColorParent