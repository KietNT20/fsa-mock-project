// component button
const CustomButton = ({
  text = "Submit",
  onClick,
  className = "btn",
  id,
  additionalClass = "",
  ...props
}) => {
  // kết hợp class mặc định và class bổ sung
  const combinedClassName = `${className} ${additionalClass}`.trim();

  return (
    <button
      type="button"
      className={combinedClassName}
      onClick={onClick}
      id={id}
      {...props} // spread thêm các thuộc tính khác nếu có
    >
      {text}
    </button>
  );
};

export default CustomButton;
