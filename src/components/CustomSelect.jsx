import React, { useState } from 'react';
import { useEffect } from 'react';
import OptionItemC from './ConceptRoom/ConceptRoomView/Popup/ProductOptionForm/OptionItemC';
import OptionItemS_I from './ConceptRoom/ConceptRoomView/Popup/ProductOptionForm/OptionItemS_I';
import { formatNumber } from '@utils/functions';

const CustomSelect = ({ optionList, type, showOptionList, setShowOptionList }) => {
  const [activeOption, setActiveOption] = useState('');

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (
      !e.target.classList.contains('custom-select-option') &&
      !e.target.classList.contains('custom-select-container')
    ) {
      setShowOptionList('');
    }
  };

  return optionList[`product_opt1_${type}`].map((opt, indexParent) => (
    <div className="option-item" key={indexParent}>
      <div
        className={`custom-select-container d-flex align-items-center justify-content-between ${
          showOptionList === opt.opt_cd1 ? 'active' : ''
        }`}
        onClick={() => setShowOptionList((prev) => (prev === opt.opt_cd1 ? '' : opt.opt_cd1))}
      >
        <h4 className={`selected-text`}>{opt.opt_nm1}</h4>
        <img
          src={`/images/svg/${
            showOptionList === opt.opt_cd1 ? 'dropdown-v2' : 'dropdown-v2-disabled'
          }.svg`}
          alt=""
        />
      </div>

      <ul
        className={`select-options ${showOptionList === opt.opt_cd1 ? '' : 'hidden'}`}
        name={`option${opt.opt_cd1}`}
        data-option-cd={opt.opt_cd1}
        data-option-nm={opt.opt_nm1}
        data-option-gb="C"
        data-mandatory-yn={opt.mandatory_yn}
        data-index={indexParent + 1}
      >
        {type === 'c' ? (
          indexParent === 0 ? (
            optionList[`product_opt2_${opt.opt_cd1}`]?.map((opt2, index) => (
              <OptionItemC
                opt2={opt2}
                key={index}
                formatNumber={formatNumber}
                productData={optionList}
                indexParent={index}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
                setShowOptionList={setShowOptionList}
              />
            ))
          ) : (
            <li className="custom-select-option d-flex align-items-center active"></li>
          )
        ) : (
          optionList[`product_opt2_${opt.opt_cd1}`]?.map((opt2, index) => (
            <OptionItemS_I
              opt2={opt2}
              key={index}
              formatNumber={formatNumber}
              opt={opt}
              productData={optionList}
              setShowOptionList={setShowOptionList}
              activeOption={activeOption}
              setActiveOption={setActiveOption}
            />
          ))
        )}
      </ul>
    </div>
  ));
};

export default CustomSelect;
