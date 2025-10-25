

const TextArea = ({ label, type, name, placeholder, className, value, ...rest }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="" className="text-base font-normal capitalize">
        {label}
      </label>
      <textarea
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        rows={8}
        {...rest}
        className={"rounded-[3px] px-1.5 py-2 text-sm ring-1 ring-primary focus:outline-none " + className}
      ></textarea>
    </div>
  );
};

export default TextArea;
