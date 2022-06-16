import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/phonebook/phonebook-actions";
import { getFilter } from "../../redux/phonebook/phonebook-selectors";
import s from "./Filter.module.css";

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(changeFilter(e.currentTarget.value));
  };
  return (
    <label>
      <input
        className={s.Input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Filter;
