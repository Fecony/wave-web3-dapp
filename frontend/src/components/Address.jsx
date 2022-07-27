const Address = ({ text: owner, address, color, bgColor }) => {
  bgColor = bgColor || "bg-blue-100";
  color = color || "text-blue-800";

  return (
    <a
      href={`https://rinkeby.etherscan.io/address/${address}`}
      target="_blank"
      className={`flex items-center justify-center py-1.5 px-3 rounded-md text-xs font-medium cursor-pointer ${bgColor} ${color}`}
    >
      {owner}: {address}
    </a>
  );
};

export default Address;
