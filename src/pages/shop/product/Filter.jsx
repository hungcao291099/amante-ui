import { formatNumber } from '@utils/functions';

const Filter = ({products, setInStock, sorts, getSortValue}) => {

  return (
    <div className="prd_top">
      <p className="txt">
        총 <em id="total_count_text">{products.total ? formatNumber(products.total) : 0}</em>개
      </p>
      <div className="top_r">
        <div className="design_checkbox">
          <input
            onChange={() => setInStock((prev) => !prev)}
            type="checkbox"
            id="all_Y"
            value="Y"
          />
          <label htmlFor="all_Y">재고있음</label>
        </div>
        <select onChange={getSortValue} name="js_select" id="js_select" className="pd_select">
          {sorts?.map((sort, index) => (
            <option key={index} value={sort.bigo}>
              {sort.code_nm2}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
