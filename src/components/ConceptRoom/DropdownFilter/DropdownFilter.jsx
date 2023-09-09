import { useState } from 'react';
import { clickOutsideClose } from '@utils/functions'

const DropdownFilter = ({setFilter, filter}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  clickOutsideClose('dropdown-filter div', setShowDropdown, null)

  return (
    <div className="filter-wrap d-flex justify-content-end">
      <div className="dropdown-filter d-flex align-items-center">
        <div onClick={() => setShowDropdown((prev) => !prev)} className="d-flex gap-3">
          <h4>{filter.name}</h4>
          <img
            className="dropdown-icon"
            src={`/images/svg/dropdown.svg`}
            alt="This is a dropdown icon"
          />
        </div>
        {showDropdown && (
          <ul>
            <li onClick={() => {
              setFilter({value: 'newest', name: '인기순'})
              setShowDropdown(false)
            }}>
              <h4 className={filter.value === 'newest' ? 'active' : ''}>인기순</h4>
              {filter.value === 'newest' && <img src="/images/svg/checkmark.svg" alt="This is a checkmark icon" />}
            </li>
            <li onClick={() => {
              setFilter({value: 'popular', name: '최신순'})
              setShowDropdown(false)
            }}>
              <h4 className={filter.value === 'popular' ? 'active' : ''}>최신순</h4>
              {filter.value === 'popular' && <img src="/images/svg/checkmark.svg" alt="This is a checkmark icon" />}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownFilter;
