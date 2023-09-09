import { useState } from "react";
import DropdownItem from "@components/ConceptRoom/DropdownSelect/DropdownItem";
import { clickOutsideClose } from '@utils/functions'

const DropdownList = ({ conceptRoomImageURL, style, dataFilter, setDataFilter, activeList, setActiveList }) => {
  const [label, setLabel] = useState(style.h_name)

  /* Set item selected
    - Just get a value if it have the same option.h_code
  */
  const handleSelectOption = (option) => {
    const newArray = dataFilter.filter(item => !item.includes(option.h_code))
    setDataFilter([...newArray, `${option.h_code}|${option.d_code}`])
    setLabel(option.d_name)
  };

  // Check selected item
  const activeCheck = (option) => dataFilter?.includes(`${option.h_code}|${option.d_code}`);

  // Close select when click outside
  clickOutsideClose('dropdown-select__label.active', setActiveList, null)


  return (
    <div className="dropdown-select">
      <div
          onClick={() => setActiveList(prev => prev === style.h_code ? null : style.h_code)}
          className={`d-flex align-items-center justify-content-between dropdown-select__label ${
            style.h_code === activeList ? 'active' : ''
          }`}
        >
         <img
              className="icon-style"
              src={`${conceptRoomImageURL}/${style.h_code === activeList ? style.file_nm_enb : style.file_nm_dis}`}
            />
          <h5>{label}</h5>
          <img
            className="dropdown-icon"
            src={`/images/svg/dropdown${style.h_code === activeList ? '-active' : ''}.svg`}
            alt="This is a dropdown icon"
          />
        </div>

      {style.h_code === activeList ? (
        <ul className="dropdown-list">
          {style.detailed?.map((detail) => (
            <DropdownItem
              key={detail.d_code}
              active={activeCheck(detail)}
              option={detail.d_name}
              onChange={() => handleSelectOption(detail)}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DropdownList;

