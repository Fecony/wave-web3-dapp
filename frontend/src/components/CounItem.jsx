const CountItem = ({ text, count, textColor, bgColor }) => {
  textColor = textColor || "text-blue-800";
  bgColor = bgColor || "bg-blue-100";

  return (
    <span
      className={`inline-flex flex-grow justify-center items-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium ${textColor} ${bgColor}`}
    >
      {text}
      <span className="items-center py-0.5 px-1.5 rounded-full text-xs ">
        {count.toNumber()}
      </span>
    </span>
  );
};

export default CountItem;
