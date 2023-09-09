const DropdownItem = ({ option, active, onChange }) => {

  return (
    <li className={active ? 'active' : ''} onClick={onChange}>
      <h4>{option}</h4>
      {active && <img src="/images/svg/checkmark.svg" alt="This is a checkmark icon" />}
    </li>
  );
};

export default DropdownItem;
