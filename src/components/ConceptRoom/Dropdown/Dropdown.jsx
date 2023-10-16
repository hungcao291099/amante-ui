/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-02 15:17:54
 * @modify date 2023-10-03 11:06:13
 * @desc This is a dropdown component for concept room
 */

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import { conceptRoomImageURL } from "@utils/constants";
import styles from "./Dropdown.module.css";

const Dropdown = ({
  refElement,
  label,
  data,
  icon,
  active,
  filter,
  onActive,
  onChange,
}) => {
  const [name, setName] = useState(label);

  const handleGetFilter = (option, styleName) => {
    const string = `${option.h_code}|${option.d_code}`;

    const existOption = filter?.includes(string);

    let newArray = [];

    if (existOption) {
      newArray = filter.filter((item) => item !== string);
      onChange([...newArray]);
      setName(styleName);
    } else {
      newArray = filter.filter((item) => !item.includes(option.h_code));
      onChange([...newArray, string]);
      setName(option.d_name);
    }
  };

  const checkActive = (option) => {
    return filter?.includes(`${option.h_code}|${option.d_code}`);
  };

  return (
    <div
      ref={refElement}
      onClick={onActive}
      className={`
          ${styles.dropdown_block} 
          ${icon ? styles.icon : ""}
      `}
    >
      <div
        className={`
          ${styles.dropdown_label} 
          ${active ? styles.dropdown_label__active : ""} 
        `}
      >
        {icon && (
          <img
            className={styles.label_icon}
            src={`${conceptRoomImageURL}/${icon}`}
          />
        )}

        <h4 className={styles.label_name}>{name}</h4>

        {active ? (
          <IoIosArrowUp className={styles.arrow_icon} size={18} />
        ) : (
          <IoIosArrowDown className={styles.arrow_icon} size={18} />
        )}
      </div>

      {active && (
        <ul className={styles.dropdown_list}>
          {data?.map((item) => (
            <li
              key={item.d_code}
              onClick={() => handleGetFilter(item, label)}
              className={`
                ${styles.dropdown_item} 
                ${checkActive(item) ? styles.dropdown_item__active : ""}
              `}
            >
              <h5 className={styles.item_name}>{item.d_name}</h5>
              {checkActive(item) && <AiOutlineCheck />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
