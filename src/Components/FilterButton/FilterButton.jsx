import Button from "../Button/Button";
import PropTypes from "prop-types";

const FilterButton = ({ filter, active, setFilter }) => {
  return (
    <Button
      type="button"
      className={`btn toggle-btn ${active ? "active" : ""}`}
      aria-pressed={active ? "true" : "false"}
      onClick={() => setFilter(filter)}
    >
      <span className="visually-hidden">Show </span>
      <span>{filter}</span>
      <span className="visually-hidden"> tasks</span>
    </Button>
  );
};

FilterButton.propTypes = {
  filter: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterButton;
