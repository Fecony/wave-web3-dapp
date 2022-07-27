import MetaMaskLogo from "../assets/metamask_logo.svg";

const MetaMaskExtension = () => {
  return (
    <a
      href="https://metamask.io/download/"
      target="_blank"
      type="button"
      className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
    >
      <img src={MetaMaskLogo} width={16} height={16} alt="MetaMask Logo" />
      <span>Get MetaMask extension</span>
    </a>
  );
};

export default MetaMaskExtension;
