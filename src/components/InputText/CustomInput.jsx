// CustomInput.js

// component input
const CustomInput = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  iconClass,
}) => {
  return (
    <div className="input-field">
      {/* phần icon dùng i để đồng bộ với css */}
      <i className={iconClass}></i>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="custom-input"
      />
    </div>
  );
};

export default CustomInput;
